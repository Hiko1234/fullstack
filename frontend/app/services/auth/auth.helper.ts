import Cookies from "js-cookie";
import { actionsLS } from "@/utils/actionsLS";
import { EnumTokens } from "@/enums";
import { ITokens, IAuthResponse } from "@/interfaces/user.interface";

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return accessToken || null;
};

export const getUserFromStorage = () => {
    return actionsLS.getItem("user") || {};
};

export const saveTokensStorage = (data: ITokens) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken);
    Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken);
};

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
    Cookies.remove(EnumTokens.REFRESH_TOKEN);
    actionsLS.removeItem("user");
    actionsLS.removeItem("isAuthorised");
};

export const saveToStorage = (data: IAuthResponse) => {
    saveTokensStorage(data);
    actionsLS.setItem("user", data.user);
    actionsLS.setItem("isAuthorised", true);
};