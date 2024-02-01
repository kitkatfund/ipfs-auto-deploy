import { FastifyInstance } from "fastify";
import { IPFSDeploymentDetailsRepository } from "../repository/ipfsDeploymentDetailsRepository.js";

export class GithubService {
    private ipfsDeploymentDetailsRepository: IPFSDeploymentDetailsRepository;

    constructor(fastify: FastifyInstance) {
        this.ipfsDeploymentDetailsRepository = new IPFSDeploymentDetailsRepository(fastify);
    }

    async checkGithubForRelaseUpdatesUpdates() {

    }
}