import { Type, Static } from '@sinclair/typebox';

const GithubReleaseDetails = Type.Object({
    _id: Type.Optional(Type.String()),
    tagName: Type.String(),
    cid: Type.String(),
    publishedAt: Type.Number(),    
});

type GithubReleaseDetails = Static<typeof GithubReleaseDetails>;


export { GithubReleaseDetails };