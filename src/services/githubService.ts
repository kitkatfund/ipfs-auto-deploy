import { FastifyInstance } from "fastify";
import { AppConfig } from "../types/appConfig.js";
import { Octokit } from "octokit";
import { GithubReleaseDetailsRepository } from "../repository/githubReleaseDetailsRepository.js";
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";
import { ApiError } from "../errors/apiError.js";

export class GithubService {
    private githubReleaseDetailsRepository: GithubReleaseDetailsRepository;
    private octokit: Octokit;

    constructor(fastify: FastifyInstance) {
        this.githubReleaseDetailsRepository = new GithubReleaseDetailsRepository(fastify);
        this.octokit = new Octokit({
            auth: process.env.GITHUB_AUTH_TOKEN,
        });
    }

    async checkGithubForRelaseUpdatesUpdates(appConfig: AppConfig): Promise<{ hasNewerReleaseAvailable: boolean, fetchedReleaseData?: GithubReleaseDetails }> {
        const response = await this.octokit.request(`GET /repos/${appConfig.repoOwner}/${appConfig.repoName}/releases/latest`, {
            owner: appConfig.repoOwner,
            repo: appConfig.repoName,
        });
        //   const latestRelease = response.data;

        console.log(response.data.tag_name); // Output: v1.0.0

        if (response.status !== 200) {
            throw new ApiError(500, "Failed to fetch the latest release details from Github");
        }

        const cidHash = this.parseCIDHashFromReleaseNotes(response.data.body);

        const fetchedReleaseData: GithubReleaseDetails = {
            appUUID: appConfig.appUUID,
            cidHash: cidHash,
            version: response.data.tag_name.replace('v', ''),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        let savedReleaseData: GithubReleaseDetails = await this.githubReleaseDetailsRepository.getGithubReleaseDetailsByAppUUID(appConfig.appUUID);
        if (savedReleaseData === null) {
            console.log("No release data found in the database");
            const newReleaseData: GithubReleaseDetails = {
                appUUID: appConfig.appUUID,
                cidHash: cidHash,
                version: "0.0.0",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            savedReleaseData = { ...newReleaseData };
        }

        // Compare the latest IPFS Deployment with the current IPFS Deployment in the database
        const hasNewerReleaseAvailable = this.newerVersionReleased(fetchedReleaseData.version, savedReleaseData.version);

        if (hasNewerReleaseAvailable) {
            return { hasNewerReleaseAvailable, fetchedReleaseData };
        }

        return { hasNewerReleaseAvailable };
    }

    parseCIDHashFromReleaseNotes(releaseNotes: string) {
        // Parse the CID Hash from the release notes
        const cidHash = releaseNotes.match(/Qm[1-9A-HJ-NP-Za-km-z]{44}/)
        if (cidHash === null) {
            throw new Error("No CID Hash found in the release notes");
        }
        return cidHash[0];
    }

    newerVersionReleased(fetchedVersion: string, savedVersion: string) {
        // Split version strings into arrays of numbers
        const fetchedParts = fetchedVersion.split('.').map(Number);
        const latestParts = savedVersion.split('.').map(Number);

        // Compare the parts
        for (let i = 0; i < fetchedParts.length; i++) {
            if (fetchedParts[i] > latestParts[i]) {
                return true; // Current version is less
            } // Current version is greater
        }

        return false; // Both versions are equal
    }

    async saveReleaseDetails(releaseDetails: GithubReleaseDetails) {
        if (releaseDetails._id === undefined) {
            const insertResult = await this.githubReleaseDetailsRepository.insertGithubReleaseDetails(releaseDetails);
            return insertResult;
        }

        const updateResult = await this.githubReleaseDetailsRepository.updateGithubReleaseDetails(releaseDetails._id, releaseDetails);
        return updateResult;
    }
}