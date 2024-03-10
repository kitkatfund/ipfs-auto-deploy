# KitKat IPFS Auto Deploy
This project was born with the idea of creating a simple and fast way to pin new releases of a customisable list of applications on IPFS.

## How it works
The app is a simple Fastify server that runs a cron job every 5 minutes. The cron job checks if there are new releases of the applications listed in the `/src/utils/config.ts` file. If there are new releases, the app will get the Content Identifier (CIDv0 of the release), pin it on IPFS and update the transfrom rule for this application on cloudflare.

## Setup Instructions

1. Clone the repository
2. Install the dependencies with `npm install`
3. Copy the `.env.sample` file and rename it to `.env`
    1. Set the correct value for `MONGO_URI`. You can use any MongoDB instance, including one inside a self-hosted container. If you don't have a MongoDB instance, you can use the free tier of [MongoDB Atlas](https://www.mongodb.com/atlas/database).
    2. [Obtain your `PINATA_JWT`](https://app.pinata.cloud/developers/api-keys) Token and set it in the `.env` file. Make sure to have the `pinByHash` and `unpin` permission enabled.
    3. [Obtain your `GITHUB_AUTH_TOKEN`](https://github.com/settings/tokens?type=beta) and set it in the `.env` file. No permissions are required if only fetching releases from public repositories.
    4. [Obtain your `CLOUDFLARE_API_TOKEN`](https://dash.cloudflare.com/profile/api-tokens) and set it in the `.env` file. Make sure to have the `Zone.Transform Rules` permissions for the API Token.
4. [Create a Telegram Bot](https://core.telegram.org/bots/tutorial) for deployment notifications.
    1. Set the `TELEGRAM_BOT_TOKEN` in the `.env` file.
    2. Create a new group, add your new bot to it, make it the group admin. Find out the chat ID of the group by visiting `https://web.telegram.org/a/` and selecting the group. The chat ID will be in the URL, it ususally starts with `-100` for groups that have bot admins. Set the `TELEGRAM_CHAT_ID` in the `.env` file.
5. [Create a new Cloudflare Transform Rule](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/) for each of the apps you want to pin. The rules can have any values for now as our application will fix them for us. We just need to do this for the Rule ID to be available in the next step.
6. Copy the `src/utils/config.sample.ts` file and rename it to `src/utils/config.ts`
    1. Add the `appUUID`, `transformedURL`, `transformedURL` inside `cloudflareRuleExpression`, `cloudflareZoneId`, `cloudflareRulesetId` and `cloudflareRuleId` for each of the apps. You can obtain the `cloudflareZoneId` by following the instructions in the [Cloudflare documentation](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/). The `cloudflareRulesetId` and `cloudflareRuleId` can be obtained by following the instructions on [this page](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/).
7. Deploy with a method of your choice, just like any backend application, Dockerfile is included.