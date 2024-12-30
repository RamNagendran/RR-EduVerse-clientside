import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBaseResponse, IFetchThunkReturns, IPermissions, IPermissonPack, IRoles } from '../../features/pages/authorization/types/auth.type';
import { fetchRoles } from '../../features/pages/authorization/api/authorization.api';
import { MENUS } from '../../common/constants';


type IResponse = IBaseResponse<IRoles[] | null>;

const defaultPermissionPack: IPermissonPack = {
    COURSE: [],
    TASKS: [],
    BATCH: [],
    DASHBOARD: [],
    STUDENTS: [],
    PERSONNEL: [],
    AUTHORIZATION: []
};

// Async Thunk operations for fetching roles...
export const fetchRolesThunk = createAsyncThunk<IFetchThunkReturns, void, { rejectValue: string }>(
    'roles/fetchRoles',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { user } = (getState() as any).auth;

            if (!user) {
                return rejectWithValue('User not authenticated');
            }

            const response: IResponse = await fetchRoles({
                username: user.username,
                role_id: user.role_id
            });

            if (response?.success && response?.data) {

                const loggedUser: IRoles[] | [] = response.data.filter(role => role.role_id === user.role_id) || [];
                if (!loggedUser) {
                    return rejectWithValue('No matching role found');
                }
                const updatedPermissionPack = { ...defaultPermissionPack };
                if (loggedUser.length > 0) {
                    loggedUser[0].role_permissions.forEach((rp: IPermissions) => {
                        const menu = MENUS[rp.menu_id];
                        if (menu && menu in updatedPermissionPack) {
                            updatedPermissionPack[menu as keyof IPermissonPack] = rp.permissions;
                        }
                    })
                }
                return { roles: response.data, loggedUser_perms: updatedPermissionPack };
            }
            return rejectWithValue('Failed to fetch roles');
        } catch (error) {
            return rejectWithValue('An unexpected error occurred');
        }
    }
);