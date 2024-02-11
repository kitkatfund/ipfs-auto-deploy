import { Telegraf } from "telegraf";
import { AppConfig } from "../types/appConfig.js";
import { GithubReleaseDetails } from "../schema/githubReleaseDetails.js";

export class InternalNotificationsService {
    notifierBot: Telegraf;

    constructor() {
        this.notifierBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
    }

    async sendSuccessMessageToTelegram(appConfig: AppConfig, githubReleaseDetails: GithubReleaseDetails) {
        const message = `🎉 Successfully deployed ${appConfig.appName}, version v${githubReleaseDetails.version} to Pinata, with CID v0: ${githubReleaseDetails.cidHash}.\nTry it out at: ${appConfig.transformedURL}`;
        this.notifyInformationOnTelegram(message);
    }

    async notifyInformationOnTelegram(message: string) {
        this.notifierBot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID!, message).catch((err: any) => {
            console.warn(`Error sending Telegram Notification: ${err}`);
        });
    }
}