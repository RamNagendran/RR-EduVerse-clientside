import { Iuser } from "../features/home/types/home.type";
import { IPermissonPack } from "../features/pages/authorization/types/auth.type";

// src/stateManager/types.ts
export interface RootState {
    auth: {
        user: Iuser;
        isAuthenticated: boolean;
        token: string | null;
        login_at: string | null;
    };
    roles: {
        loggedUser_perms: IPermissonPack;
        roles: Array<any>;
        loading: string;
        error: string | null;
    };
    courses: {
        courses: Array<any>;
        selectedCourse: any | null;
    };
}