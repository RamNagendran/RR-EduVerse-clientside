// errorTypes.ts
export enum ErrorType {
    NETWORK = 'NETWORK_ERROR',
    AUTH = 'AUTHENTICATION_ERROR',
    VALIDATION = 'VALIDATION_ERROR',
    SERVER = 'SERVER_ERROR',
    NOT_FOUND = 'NOT_FOUND_ERROR',
    UNKNOWN = 'UNKNOWN_ERROR'
}

export interface AppError extends Error {
    type: ErrorType;
    status?: number;
    details?: any;
}

export class CustomError implements AppError {
    name: string;
    message: string;
    type: ErrorType;
    status?: number;
    details?: any;

    constructor(type: ErrorType, message: string, statusCode?: number, details?: any) {
        this.name = 'CustomError';
        this.type = type;
        this.message = message;
        this.status = statusCode;
        this.details = details;
    }
}