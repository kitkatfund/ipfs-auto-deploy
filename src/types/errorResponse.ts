import { Type, Static } from '@sinclair/typebox';

const ErrorResponse = Type.Object({
    statusCode: Type.Number(),
    errorMessage: Type.String(),
});

type ErrorResponse = Static<typeof ErrorResponse>

export { ErrorResponse }
