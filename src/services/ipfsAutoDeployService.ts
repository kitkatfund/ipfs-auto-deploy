import { GithubService } from "./githubService.js";
import { FastifyInstance } from "fastify";
import { IPFSDeploymentDetailsRepository } from "../repository/ipfsDeploymentDetailsRepository.js";
import { Octokit } from "octokit";
// import { Pinata } from "pinata-sdk";
// import { BaseRepository } from './baseRepository';

export class IPFSAutoDeployService {
    private githubService: GithubService;
    GITHUB_RELEASE_DETAILS_COLLECTION= process.env.GITHUB_RELEASE_DETAILS_COLLECTION!;

    constructor(fastify: FastifyInstance) {
        this.githubService = new GithubService(fastify);
    }

    async checkForIPFSDeplymentUpdates() {
        // Check for IPFS Deployment Updates with Github API

        const octokit = new Octokit({
            auth: process.env.GITHUB_AUTH_TOKEN,
          })
          
        const response = await octokit.request('GET /repos/persistenceOne/persistenceWallet/releases', {
            owner: 'persistenceOne',
            repo: 'persistenceWallet',
            headers: {
              // 'Accept': 'application/vnd.github.v3+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        
        //   const latestRelease = response.data;
        
          const latestRelease = response.data.tag_name;



        // Compare the latest IPFS Deployment with the current IPFS Deployment in the database

        //   const currentRelease = await githubReleaseDetails.collection('GithubReleaseTracker').findOne({});
        //   const currentRelease = await this.GITHUB_RELEASE_DETAILS_COLLECTION.findOne({});

        // async getAllObjects(collectionName: string): Promise<any[]> {
        //     const collection = await this.getCollection(githubReleaseDetails);
        //     return githubReleaseDetails.find({}).toArray();
        // }
        
        function compareVersions(currentRelease, latestRelease) {
            // Split version strings into arrays of numbers
            const currentParts = currentRelease.split('.').map(Number);
            const latestParts = latestRelease.split('.').map(Number);
          
            // Compare each part of the version
            for (let i = 0; i < Math.max(currentParts.length, latestRelease.length); i++) {
              const num1 = currentParts[i] || 0; // Use 0 if the part is undefined
              const num2 = latestParts[i] || 0; // Use 0 if the part is undefined
          
              if (num1 < num2) {
                return -1; // currentVersion is less than latestVersion - update is required
              } else if (num1 > num2) {
                return 1; // currentVersion is greater than latestVersion - no update is required
              }
              // Continue to the next part if the current parts are equal
            }
          
            return 0; // Both versions are equal
          }
          
                  
          const result = compareVersions(currentRelease, latestRelease);
          
          console.log(result); // Output: -1 (version1 is less than version2)

        // If there is an update, use the Pinata SDK to update the deployment and update the database




        // If an update was made, update the relevant transform rule on Cloudflare to point to the new IPFS Deployment using the CLoudflare API

    }
}