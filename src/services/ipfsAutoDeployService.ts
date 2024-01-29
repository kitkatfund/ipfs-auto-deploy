import { FastifyInstance } from "fastify";
import { IPFSDeploymentDetailsRepository } from "../repository/ipfsDeploymentDetailsRepository.js";

export class IPFSAutoDeployService {
    private ipfsDeploymentDetailsRepository: IPFSDeploymentDetailsRepository;

    constructor(fastify: FastifyInstance) {
        this.ipfsDeploymentDetailsRepository = new IPFSDeploymentDetailsRepository(fastify);
    }

    async checkForIPFSDeplymentUpdates() {
        // Check for IPFS Deployment Updates with Github API

        // Compare the latest IPFS Deployment with the current IPFS Deployment in the database

        // If there is an update, use the Pinata SDK to update the deployment and update the database

        // If an update was made, update the relevant transform rule on Cloudflare to point to the new IPFS Deployment using the CLoudflare API
    }
}