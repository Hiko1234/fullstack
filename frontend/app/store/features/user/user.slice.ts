import { IInitialState } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout, register } from "./user.actions";
import { errorCatch } from "@/api/api.helper";

const initialState: IInitialState = {
    user: null,
    isAuthorised: false,
    isLoading: false,
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
            state.error = ""
        }).addCase(register.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isAuthorised = true
            state.user = payload.user
            state.error = ""
        }).addCase(register.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = errorCatch(payload) as string
        }).addCase(login.pending, (state) => {
            state.isLoading = true
            state.error = ""
        }).addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isAuthorised = true
            state.user = payload.user
            state.error = ""
        }).addCase(login.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isAuthorised = false
            state.user = null
            state.error = errorCatch(payload) as string
        }).addCase(logout.fulfilled, (state) =>{
            state.isLoading = false
            state.isAuthorised = false
            state.user = null
            state.error = ""
        }).addCase(checkAuth.fulfilled, (state, { payload }) => {
            state.isAuthorised = true
            state.user = payload.user
        })
    }
})