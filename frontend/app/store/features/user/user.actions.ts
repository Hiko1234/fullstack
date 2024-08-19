import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "@/api/api.helper";
import { IAuthResponse, IEmailPassword, IRegister } from "@/interfaces/user.interface";
import { removeFromStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";

// register
export const register = createAsyncThunk<IAuthResponse, IRegister>("auth/register", async (data, thunkApi) => {
    try {
        const response = await AuthService.register(data);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(`auth/login`, async (data, thunkApi) => {
    try {
        const response = await AuthService.login(data);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    removeFromStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>("auth/check-auth", async (_, thunkApi) => {
    try {
        const response = await AuthService.getNewTokens();
        return response.data;
    } catch (error) {
        if(errorCatch(error) === "jwt expired"){
            thunkApi.dispatch(logout());
        }

        return thunkApi.rejectWithValue(error);
    }
});