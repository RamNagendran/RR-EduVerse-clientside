import { createSlice } from "@reduxjs/toolkit";


const userSession = createSlice({
    name: "UserSession",
    initialState: {
        userDetails: null,
        authToken: null,
        role: null
    },
    reducers: {
        setLoginCredentials: (state, action) => {
            state.userDetails = action.payload.userDetails;
            state.authToken = action.payload.authToken;
            state.role = action.payload.role;
        },
        clearLoginCredentials: (state) => {
            state.userDetails = null;
            state.authToken = null;
            state.role = null;
        }
    }
})

export const {setLoginCredentials, clearLoginCredentials} = userSession.actions;
export default userSession.reducer;