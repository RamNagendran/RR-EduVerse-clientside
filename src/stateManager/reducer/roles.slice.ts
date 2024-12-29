import { createSlice } from '@reduxjs/toolkit';
import { IPermissonPack, RolesState } from '../../features/pages/authorization/types/auth.type';
import { fetchRolesThunk } from './rolesThunk';


const loggedUser_perms: IPermissonPack = {
    COURSE: [],
    TASKS: [],
    BATCH: [],
    DASHBOARD: [],
    STUDENTS: [],
    PERSONNEL: [],
    AUTHORIZATION: []
}

const initialState: RolesState = {
    roles: [],
    loggedUser_perms,
    loading: 'idle',
    error: null,
    
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        clearRoles: (state) => {
            state.roles = [];
            state.loading = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRolesThunk.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchRolesThunk.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.roles = action.payload.roles;
                state.loggedUser_perms = action.payload.loggedUser_perms;
                state.error = null;
            })
            .addCase(fetchRolesThunk.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload || 'An error occurred';
            });
    }
});

export const { clearRoles } = rolesSlice.actions;
export default rolesSlice.reducer;