import { Document, UpdateResult, InsertOneResult, DeleteResult } from "mongodb";
import { BaseRepository } from './baseRepository.js';
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";

export class GithubReleaseDetailsRepository extends BaseRepository {
    GITHUB_RELEASE_DETAILS_COLLECTION = process.env.GITHUB_RELEASE_DETAILS_COLLECTION!;

    async getAllGithubReleaseDetails(): Promise<Array<GithubReleaseDetails>> {
        return this.getAllObjects(this.GITHUB_RELEASE_DETAILS_COLLECTION);
    }

    async insertGithubReleaseDetails(GithubReleaseDetails: GithubReleaseDetails): Promise<InsertOneResult> {
        return this.insertObject(this.GITHUB_RELEASE_DETAILS_COLLECTION, GithubReleaseDetails);
    }

    async updateGithubReleaseDetails(recordId: string, GithubReleaseDetails: GithubReleaseDetails): Promise<Document | UpdateResult> {
        return this.updateObject(this.GITHUB_RELEASE_DETAILS_COLLECTION, recordId, GithubReleaseDetails);
    }

    async deleteGithubReleaseDetails(recordId: string): Promise<DeleteResult> {
        return this.deleteObject(this.GITHUB_RELEASE_DETAILS_COLLECTION, recordId);
    }
}
