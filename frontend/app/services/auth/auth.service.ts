import Cookies from "js-cookie"
import { instance } from "@/api/api.interceptor";
import { saveToStorage } from "./auth.helper";
import { IAuthResponse, IEmailPassword, IRegister } from "@/interfaces/user.interface";
import { EnumTokens, EnumAuthMethod } from "@/enums";

export const AuthService = {

    async register(data: IRegister) {
        const response = await instance<IAuthResponse>({
            url: `/auth/${EnumAuthMethod.REGISTER}`,
            method: "POST",
            data,
        });

        if (response.data.accessToken) saveToStorage(response.data);

        return response.data;
    },

    async login(data: IEmailPassword) {
        const response = await instance<IAuthResponse>({
            url: `/auth/${EnumAuthMethod.LOGIN}`,
            method: "POST",
            data,
        });

        if (response.data.accessToken) saveToStorage(response.data);

        return response.data;
    },

    async getNewTokens() {
        const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN);

        const response = await instance<string, { data: IAuthResponse }>({
            url: "/auth/login/access-token",
            method: "POST",
            data: { refreshToken: refreshToken },
        });

        if (response.data.accessToken) saveToStorage(response.data);

        return response;
    }
}