export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface ILoginResponse {
    login_at: string;
    success: boolean;
    userDetails: any;
    token: string;
}

export interface IErrorResponse {
    data: null;
    error: string;
}

export interface LoginFormState {
    email: string;
    password: string;
    showPassword: boolean;
}

export interface ErrorState {
    email: string;
    password: string;
    commonErrors: string;
}