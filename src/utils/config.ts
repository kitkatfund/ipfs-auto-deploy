import { AppConfig } from "../types/appConfig.js";


const CONFIGURED_APPS: Array<AppConfig> = [
    {
        appUUID: "791795b7-2a32-4e43-99ca-15724d212684",
        appName: "Persistence Wallet",
        repoOwner: "persistenceOne",
        repoName: "persistenceWallet",
        cloudflare_zone_id: "28cdef9078fb1d33cdb2ced5bfcde39d",
        cloudflare_rule_id: "b916d97a000049699752fd0c330e372f"
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