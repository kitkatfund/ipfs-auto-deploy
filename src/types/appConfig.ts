import { Type, Static } from '@sinclair/typebox';

const AppConfig = Type.Object({
    appUUID: Type.String(),
    appName: Type.String(),
    repoOwner: Type.String(),
    repoName: Type.String(),
    transformedURL: Type.String(),
    cloudflareRuleExpression: Type.String(),
    cloudflareZoneId: Type.String(),
    cloudflareRulesetId: Type.String(),
    cloudflareRuleId: Type.String(),
});

type AppConfig = Static<typeof AppConfig>

export { AppConfig }
