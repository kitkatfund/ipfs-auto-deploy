import { Document, UpdateResult, InsertOneResult, DeleteResult } from "mongodb";
import { BaseRepository } from './baseRepository.js';
import { IPFSDeploymentDetails } from "../schema/ipfsDeploymentDetails.js";

export class IPFSDeploymentDetailsRepository extends BaseRepository {
    IPFS_DEPLOYMENT_DETAILS_COLLECTION = process.env.IPFS_DEPLOYMENT_DETAILS_COLLECTION!;

    async getAllIPFSDeploymentDetailss(): Promise<Array<IPFSDeploymentDetails>> {
        return this.getAllObjects(this.IPFS_DEPLOYMENT_DETAILS_COLLECTION);
    }

    async insertIPFSDeploymentDetails(IPFSDeploymentDetails: IPFSDeploymentDetails): Promise<InsertOneResult> {
        return this.insertObject(this.IPFS_DEPLOYMENT_DETAILS_COLLECTION, IPFSDeploymentDetails);
    }

    async updateIPFSDeploymentDetails(recordId: string, IPFSDeploymentDetails: IPFSDeploymentDetails): Promise<Document | UpdateResult> {
        return this.updateObject(this.IPFS_DEPLOYMENT_DETAILS_COLLECTION, recordId, IPFSDeploymentDetails);
    }

    async deleteIPFSDeploymentDetails(recordId: string): Promise<DeleteResult> {
        return this.deleteObject(this.IPFS_DEPLOYMENT_DETAILS_COLLECTION, recordId);
    }
}