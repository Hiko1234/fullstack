"use client"

import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useActions } from '../hooks/useActions';
import { useAppPathname } from '../hooks/useAppPathname';
import { useTranslation } from '../hooks/useTranslation';
import { notFound, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import types
import { IProduct, IProductCart } from '@/interfaces/products.interface';
import { EnumTokens } from '@/enums';
// import service
import { getAccessToken } from '@/services/auth/auth.helper';
// import utils
import { currentPath } from '@/utils/currentPath';
import { actionsLS } from '@/utils/actionsLS';
// import constants
import { WISHLIST } from '@/store/features/wishlist/wishlist.slice';
import { CART } from "@/store/features/cart/cart.slice";

// protected routes
const protectedRoutes = ['/dashboard'];

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { lang } = useTranslation();
    const {
        user,
        isAuthorised,
        getUserFavorites,
        getUserCart,
    } = useAuth();
    const {
        checkAuth,
        logout,
        addProductsToWishlist,
        addProductsToCart,
    } = useActions();

    const router = useRouter();
    const pathname = useAppPathname();

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) checkAuth();
    }, []);

    useEffect(() => {
        const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN);
        if (!refreshToken && user) logout();
    }, [pathname]);

    useEffect(() => {
        const handleAuth = async () => {
            if (!isAuthorised) {
                // wishlist from LS
                const userWishlist: IProduct[] = actionsLS.getItem(WISHLIST) || [];
                addProductsToWishlist(userWishlist);
                // cart from LS
                const userCart: IProductCart[] = actionsLS.getItem(CART) || [];
                addProductsToCart(userCart);
                return;
            };

            // get user favorites from db
            await getUserFavorites();
            // get user cart from db
            await getUserCart();
        };

        handleAuth();
    }, [isAuthorised]);

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(currentPath(lang, route)));

    const isAdminRoute = pathname.startsWith(currentPath(lang, `/admin`));

    if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

    if (user?.isAdmin) return <>{children}</>

    if (user && isProtectedRoute) return <>{children}</>

    if (user && isAdminRoute) return notFound();

    if (pathname !== currentPath(lang, `/auth`)) router.replace(currentPath(lang, `/auth`));
    return null
}

export default AuthProvider