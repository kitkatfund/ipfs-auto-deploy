import { FastifyInstance } from "fastify";
import { IPFSDeploymentDetailsRepository } from "../repository/ipfsDeploymentDetailsRepository.js";
import { Octokit } from "@octokit/core";


export class IPFSAutoDeployService {
    private ipfsDeploymentDetailsRepository: IPFSDeploymentDetailsRepository;

    constructor(fastify: FastifyInstance) {
        this.ipfsDeploymentDetailsRepository = new IPFSDeploymentDetailsRepository(fastify);
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
            
              const latestRelease = response.data;
            
              return latestRelease;

        // Compare the latest IPFS Deployment with the current IPFS Deployment in the database

        // If there is an update, use the Pinata SDK to update the deployment and update the database

        // If an update was made, update the relevant transform rule on Cloudflare to point to the new IPFS Deployment using the CLoudflare API
    }
}