import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    login_at: string | null;
    user: any | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    login_at: null,
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{user: any, token: string, login_at: string}>) => {
            state.isAuthenticated = true;
            state.login_at = action.payload.login_at;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.login_at = null;
        }
    }
});

export const {setAuth, logout} = authSlice.actions;
export default authSlice.reducer;