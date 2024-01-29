import { FastifyInstance } from "fastify";
import { CronJob, AsyncTask } from "toad-scheduler";
import { IPFSAutoDeployService } from "../services/ipfsAutoDeployService.js";

export class UpdateIPFSDeploymentSchedulerConfig {
    ipfsAutoDeployService: IPFSAutoDeployService;

    constructor(fastify: FastifyInstance) {
        this.ipfsAutoDeployService = new IPFSAutoDeployService(fastify);
    }

    updateIPFSDeployments() {
        const task = new AsyncTask('', async () => {
            await this.ipfsAutoDeployService.checkForIPFSDeplymentUpdates();
        });
        const job = new CronJob(
            // Run every 5 minutes
            { cronExpression: "*/5 * * * *" },
            task,
            { preventOverrun: true, }
        );
        return job;
    }
}