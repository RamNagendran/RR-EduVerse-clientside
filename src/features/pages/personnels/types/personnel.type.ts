
export interface IFetchUsers {
    username: string;
    role_id: number;
}

export interface Iuser {
    user_id: string;
    email: string;
    phone: number;
    username: string;
    firstname: string;
    lastname: string;
    added_by?: string;
    added_at?: string;
    role_id: number;
    status: string;
}

export interface IBaseResponse<T = null> {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}