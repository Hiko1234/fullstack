export enum EnumStyleVariables {
    PRIMARY = '#C90000',
    SECONDARY = '#0F0F0F',
    TEXT = '#0F0F0F99',
    LIGHT = '#fff',
    PRIMARY_DARK = "#750000",
    SHADOW = "0px 0px 20px 0px #0000001A",
    SHADOW_HOVER = "0px 2px 15px rgba(0, 0, 0, 0.25)",
    GREY = "#A1A1A1",
    LIGHT_GREY = "#FAFAFA",
    LIGHT_GREY2 = "#D5D6D4",
}

export enum EnumLang {
    UK = "uk",
    EN = "en",
}

export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken'
}

export enum EnumAuthMethod {
    LOGIN = 'login',
    REGISTER = 'register',
}

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'olders',
}

export enum EnumFilters {
    COLORS = 'colors',
    COUNTRIES = 'countries',
    BRANDS = 'brands'
}

export enum EnumOrderStatus {
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
}