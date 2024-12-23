
export interface IFetchUsers {
    username: string;
    role_id: number;
}

export interface Iuser {
    user_id?: string;
    email: string;
    phone: number | null;
    username: string;
    firstname: string;
    lastname: string;
    password?: string;
    added_by?: string;
    added_at?: string;
    role_id: number | null;
    status?: string;
}

export interface IUserDetailsSchema {
    username: boolean,
    email: boolean,
    phone: boolean,
    firstname: boolean,
    lastname: boolean,
    password: boolean,
    confPassword: boolean,
    role_id: boolean
}

export interface IPASSWORD_INITIALS {
    confPassword: string;
    isGeneratedToggled: boolean;
    isPasswordSame: boolean;
}

export interface IBaseResponse<T = null> {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}