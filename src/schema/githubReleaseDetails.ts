import { Type, Static } from '@sinclair/typebox';

const GithubReleaseDetails = Type.Object({
    _id: Type.Optional(Type.String()),
    appUUID: Type.String(),
    version: Type.String(),
    cidHash: Type.String(),
    updatedAt: Type.Number(),
    createdAt: Type.Number(),
});

type GithubReleaseDetails = Static<typeof GithubReleaseDetails>;


export { GithubReleaseDetails };