import axios from "axios";
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";
import { AppConfig } from "../types/appConfig.js";


export class PinataCloudService {
    private axiosRequestHeaders: any;

    constructor() {
        this.axiosRequestHeaders = {
            'Authorization': `Bearer ${process.env.PINATA_JWT}`,
        }
    }

    async pinNewReleaseToPinata(appConfig: AppConfig, githubReleaseDetails: GithubReleaseDetails) {
        const pinataOptions = {
            pinataMetadata: {
                name: `${appConfig.appName}-v${githubReleaseDetails.version}`,
            }
        };

        const requestUrl = `${process.env.PINATA_API_BASE_URL}/pinning/pinByHash`;
        const requestBody = {
            hashToPin: githubReleaseDetails.cidHash,
            ...pinataOptions,
        };
        
        const pinResponse = await axios.post(requestUrl, requestBody , {
            headers: this.axiosRequestHeaders,
        
        });
        console.log(pinResponse);

        if (pinResponse.status === 200) {
            return pinResponse;
        }

              
    }

    // async unpinOldReleaseByHash(githubReleaseDetails: GithubReleaseDetails) {
    //     const unpinResponse = await axios.delete(`${process.env.PINATA_API_BASE_URL}/pinning/unpin/${githubReleaseDetails.cidHash}`, {
    //         headers: this.axiosRequestHeaders,
    //     });
    //     console.log(unpinResponse);

    //     if (unpinResponse.status === 200) {
    //         return unpinResponse;
    //     }
    // }
}