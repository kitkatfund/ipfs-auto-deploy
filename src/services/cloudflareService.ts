import axios, { AxiosRequestConfig } from "axios";
import { AppConfig } from "../types/appConfig.js";
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";


export class CloudflareService {

    async updateTransformRule(appConfig: AppConfig, githubReleaseDetails: GithubReleaseDetails) {
        const options: AxiosRequestConfig = {
            method: 'PATCH',
            url: `${process.env.CLOUDFLARE_API_BASE_URL}/zones/${appConfig.cloudflareZoneId}/rulesets/${appConfig.cloudflareRulesetId}/rules/${appConfig.cloudflareRuleId}`,
            headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`
            },
            data: {
                expression: appConfig.cloudflareRuleExpression,
                action: 'rewrite',
                action_parameters: {
                    "uri": {
                        "path": {
                            "value": `/ipfs/${githubReleaseDetails.cidHash}`
                        }
                    }
                },
                description: `Change the URI of ${appConfig.appName} to the latest CID hash`,
                enabled: true,
            }
        };

        const transformRule = await axios.request(options);

        if (transformRule.status === 200) {
            return transformRule.data;
        }
    }
}
