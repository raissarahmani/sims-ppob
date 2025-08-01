import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storeUserInfo: (state, action) => {
            const {email, firstname, lastname, pass} = action.payload.user

            state.user = { email, firstname, lastname, pass }
            state.error = null
        },
        storeToken: (state, action) => {        
            state.token = action.payload.token
            state.error = null
            state.user = null
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
            localStorage.removeItem("token")
        }
    }
})

export const {storeUserInfo, storeToken, logout} = authSlice.actions
export default authSlice.reducer