import { AppConfig } from "../types/appConfig.js";


const CONFIGURED_APPS: Array<AppConfig> = [
    {
        appUUID: "791795b7-2a32-4e43-99ca-15724d212684",
        appName: "Persistence Wallet",
        repoOwner: "persistenceOne",
        repoName: "persistenceWallet",
        transformedURL: "https://ipfs.kitkat.zone/test-rule",
        cloudflareRuleExpression: 'starts_with(http.request.full_uri, "https://ipfs.kitkat.zone/test-rule")',
        cloudflareZoneId: "02ede70a2c7f92f4fd4cc6f1d7bcaca5",
        cloudflareRulesetId: "ed8bd75365c4455b877a28add45c0ea5",
        cloudflareRuleId: "b916d97a000049699752fd0c330e372f"
    },
    // {
    //     appUUID: "0b20687f-9f63-4f8e-9d46-7473cb9ce180",
    //     appName: "Persistence Bridge",
    //     repoOwner: "persistenceOne",
    //     repoName: "persistenceBridge",
    //     cloudflare_zone_id: "",
    //     cloudflare_rule_id: "0987654321"
    // }, {
    //     appUUID: "3b22e2c7-151e-4247-bd8e-d5f30340210c",
    //     appName: "Persistence Explorer",
    //     repoOwner: "persistenceOne",
    //     repoName: "explorer",
    //     cloudflare_zone_id: "1234567890",
    //     cloudflare_rule_id: "1357924680"
    // }
];

export { CONFIGURED_APPS };