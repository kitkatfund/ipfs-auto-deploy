import { Type, Static } from '@sinclair/typebox';

const AppConfig = Type.Object({
    appUUID: Type.String(),
    appName: Type.String(),
    repoOwner: Type.String(),
    repoName: Type.String(),
    cloudflare_zone_id: Type.String(),
    cloudflare_rule_id: Type.String(),
});

type AppConfig = Static<typeof AppConfig>

export { AppConfig }
