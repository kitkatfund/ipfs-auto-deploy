import { ErrorResponse } from "../types/errorResponse";

class ApiError extends Error {
    statusCode: number;
    errorResponse: any;
    constructor(statusCode: number, message: string, errorResponse?: any) {
        super(message);
        this.statusCode = statusCode;
        if (errorResponse) {
            this.errorResponse = errorResponse;
        } else {
            this.errorResponse = {
                statusCode: statusCode,
                errorMessage: message,
            } as ErrorResponse;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}

export { ApiError };