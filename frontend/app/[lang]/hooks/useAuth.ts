import { useTypedSelector } from "./useTypedSelector";
import { useTranslation } from "./useTranslation";
import { useNotify } from "./useNotify";
import { useActions } from "./useActions";
// import types
import { IUser } from "@/interfaces/user.interface";
import { IProduct, IProductCart } from "@/interfaces/products.interface";
// import service
import { FavoritesService } from "@/services/favorites/favorites.service";
import { CartsService } from "@/services/cart/cart.service";

interface IHook {
    user: IUser | null,
    isAuthorised: boolean,
    isLoading: boolean,
    error: string,
    getUserFavorites: () => Promise<IProduct[]>,
    getUserCart: () => Promise<IProductCart[]>,
}

export const useAuth = (): IHook => {
    const { dict, lang } = useTranslation();
    const { notify } = useNotify();
    const { addProductsToWishlist, addProductsToCart } = useActions();

    const { user, isAuthorised, isLoading, error } = useTypedSelector((state) => state.user);

    const getUserFavorites = async (): Promise<IProduct[]> => {
        try {
            const response = await FavoritesService.getByUser();
            const currentData = response.data.products.map((item) => {
                const { name_en, name_uk, ...rest } = item;
                return {
                    ...rest,
                    name: item[`name_${lang}`]
                }
            });
            addProductsToWishlist(currentData)
            return currentData
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return [];
        };
    };

    const getUserCart = async (): Promise<IProductCart[]> => {
        try {
            const response = await CartsService.getByUser();
            const currentData = response.data.products.map((item) => {
                const { name_en, name_uk, ...rest } = item;
                return {
                    ...rest,
                    name: item[`name_${lang}`]
                }
            });
            addProductsToCart(currentData)
            return currentData
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return [];
        };
    }

    return {
        user,
        isAuthorised,
        isLoading,
        error,
        getUserFavorites,
        getUserCart,
    }
};