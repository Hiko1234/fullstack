export interface IUser {
    id: number,
    email: string,
    name: string,
    avatarPath: string,
    phone: string,
    isAdmin: boolean,
}

export interface ITokens {
    accessToken: string,
    refreshToken: string,
};

export interface IInitialState {
    user: IUser | null,
    isAuthorised: boolean,
    isLoading: boolean,
    error: string,
};

export interface IEmailPassword {
    email: string,
    password: string,
};

export interface IRegister extends IEmailPassword {
    name: string,
    phone: string,
    favorite: number[],
    cart: { productId: number, quantity: number }[],
}

export interface IAuthResponse extends ITokens {
    user: IUser,
}