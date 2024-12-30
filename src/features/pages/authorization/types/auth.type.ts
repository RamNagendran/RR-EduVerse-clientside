
export interface IFetchRole {
    username: string;
    role_id: number;
}

export interface IPermissions {
    menu_id: number;
    permission_number: number;
    permissions: string[];
}

export interface IRoles {
    role_id: number;
    role_permissions: IPermissions[];
    users_count: number;
}

export interface IPermissonPack {
    COURSE?: string[];
    TASKS?: string[];
    BATCH?: string[];
    DASHBOARD?: string[];
    STUDENTS?: string[];
    PERSONNEL?: string[];
    AUTHORIZATION?: string[]
}

export interface RolesState {
    roles: IRoles[];
    loggedUser_perms: IPermissonPack;
    loading: 'idle' | 'loading' | 'failed';
    error: string | null;
}

export interface RoleCardProps {
    role: IRoles;
    index: number;
    isSelected: boolean;
    onSelect: (role: IRoles | null) => void;
}

export interface CardsDeepdiveProps {
    selectedCard: {
        role_id: number;
        role_permissions: IPermissions[];
        users_count: number;
    };
    setCardClicked: React.Dispatch<React.SetStateAction<IRoles | null>>;
}

export interface IUpdatePermissions {
    email: string;
    password: string;
    role_id: number;
    menu_id: number;
    permissions: number;
}

export interface IFetchThunkReturns {
    roles: IRoles[];
    loggedUser_perms: IPermissonPack
}

export interface IBaseResponse<T = null> {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}