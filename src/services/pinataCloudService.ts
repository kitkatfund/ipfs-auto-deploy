const pinataSDK = require('@pinata/sdk');
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";
import { AppConfig } from "../types/appConfig.js";


export class PinataCloudService {
    private pinata: any

    constructor() {
        this.pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);
    }

    async pinNewReleaseToPinata(appConfig: AppConfig, githubReleaseDetails: GithubReleaseDetails) {
        const pinataOptions = {
            pinataMetadata: {
                name: `${appConfig.appName}-v${githubReleaseDetails.version}`,
            }
        };

        const pinResponse = await this.pinata.pinByHash(githubReleaseDetails.cidHash, pinataOptions);
        console.log(pinResponse);

        if (pinResponse.status === 'pinned') {
            return pinResponse;
        }
    }

    async unpinOldReleaseByHash(cidHash: string) {
        const unpinResponse = await this.pinata.unpin(cidHash);
        console.log(unpinResponse);

        if (unpinResponse.status === 'unpinned') {
            return unpinResponse;
        }
    }
}