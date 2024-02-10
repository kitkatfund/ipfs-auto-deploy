import { GithubService } from "./githubService.js";
import { FastifyInstance } from "fastify";
import { CONFIGURED_APPS } from "../utils/config.js";
import { AppConfig } from "../types/appConfig.js";

export class IPFSAutoDeployService {
  private githubService: GithubService;
  GITHUB_RELEASE_DETAILS_COLLECTION = process.env.GITHUB_RELEASE_DETAILS_COLLECTION!;

  constructor(fastify: FastifyInstance) {
    this.githubService = new GithubService(fastify);
  }

  async checkForIPFSDeplymentUpdates() {

    // Iterate on supported Apps
    for (const app of CONFIGURED_APPS) {
      await this.checkForAppUpdates(app);
    }
  }

  async checkForAppUpdates(appConfig: AppConfig) {
    // Check for IPFS Deployment Updates with Github API
    const githubCheckResult = await this.githubService.checkGithubForRelaseUpdatesUpdates(appConfig);
    // If there is an update, use the Pinata SDK to update the deployment and update the database

    console.log(githubCheckResult);
    // If an update was made, update the relevant transform rule on Cloudflare to point to the new IPFS Deployment using the CLoudflare API

  }
}