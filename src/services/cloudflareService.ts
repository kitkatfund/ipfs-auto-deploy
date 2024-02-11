import axios from "axios";
import { AppConfig } from "../types/appConfig.js";


export class CloudflareService {

    async updateTransformRule(appConfig: AppConfig) {
        const options: any = {
            method: 'PATCH',
            // url: `https://api.cloudflare.com/client/v4/zones/${appConfig.cloudflare_zone_id}/transform/rules/${appConfig.cloudflare_rule_id}`,
            url: `https://dash.cloudflare.com/28cdef9078fb1d33cdb2ced5bfcde39d/kitkat.zone/rules/transform-rules/rewrite-url/66b4ae3a6e7042a886c5fea94aea6154`,
            headers: {  Authorization: `${process.env.CLOUDFLARE_AUTH_TOKEN}` },
            data: {
                // actions: [{ id: 'browser_check', value: 'on' }],
                // priority: 1,
                // status: 'active',
                targets: [
                    {
                        constraint: { operator: 'contains', value: '^(https?://)?(([-a-zA-Z0-9*]*\.)+[-a-zA-Z0-9]{2,20})(:(8080|8443|443|80))?(/[\S]+)?$' },
                        target: 'url'
                    }
                ]
            }
        };

        const transformRule = await axios.patch(options.url, options.data, options.headers);
        console.log(transformRule);

        // const transformRule = await axios.request(options);
        // console.log(transformRule);


        if (transformRule.status === 200) {
            return transformRule;
        }
    }
}
