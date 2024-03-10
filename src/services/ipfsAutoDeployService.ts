import { GithubService } from "./githubService.js";
import { FastifyInstance } from "fastify";
import { CONFIGURED_APPS } from "../utils/config.js";
import { AppConfig } from "../types/appConfig.js";
import { PinataCloudService } from "./pinataCloudService.js";
import { CloudflareService } from "./cloudflareService.js";
import { InternalNotificationsService } from "./internalNotificationService.js";

export class IPFSAutoDeployService {
  private githubService: GithubService;
  private pinataCloudService: PinataCloudService;
  private cloudflareService: CloudflareService;
  private internalNotificationsService: InternalNotificationsService;

  constructor(fastify: FastifyInstance) {
    this.githubService = new GithubService(fastify);
    this.pinataCloudService = new PinataCloudService();
    this.cloudflareService = new CloudflareService();
    this.internalNotificationsService = new InternalNotificationsService();
  }

  async checkForIPFSDeplymentUpdates() {

    // Iterate on supported Apps
    for (const app of CONFIGURED_APPS) {
      await this.checkForAppUpdates(app);
    }
  }

  async checkForAppUpdates(appConfig: AppConfig) {

    // Check for IPFS Deployment Updates with Github API
    const checkGithubResultResponse = await this.githubService.checkGithubForRelaseUpdatesUpdates(appConfig);

    if (checkGithubResultResponse.hasNewerReleaseAvailable) {
      const fetchedReleaseData = checkGithubResultResponse.fetchedReleaseData!;

      // If there is an update, use the Pinata SDK to update the deployment and update the database
      const pinResponse = await this.pinataCloudService.pinNewReleaseToPinata(appConfig, fetchedReleaseData);
      console.log(pinResponse);

      // If an update was made, update the relevant transform rule on Cloudflare to point to the new IPFS Deployment using the CLoudflare API
      const transformRule = await this.cloudflareService.updateTransformRule(appConfig, fetchedReleaseData);
      console.log(transformRule);

      // Send a success message to the Telegram Bot
      this.internalNotificationsService.sendSuccessMessageToTelegram(appConfig, fetchedReleaseData);
      const updatedInDB = await this.githubService.saveReleaseDetails(fetchedReleaseData);
      console.log(updatedInDB);
    }
  }
}