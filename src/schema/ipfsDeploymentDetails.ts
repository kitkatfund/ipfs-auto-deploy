import { Type, Static } from '@sinclair/typebox';

const IPFSDeploymentDetails = Type.Object({
    _id: Type.Optional(Type.String()),
    updatedAt: Type.Number(),
    createdAt: Type.Number(),
});

type IPFSDeploymentDetails = Static<typeof IPFSDeploymentDetails>;

export { IPFSDeploymentDetails };