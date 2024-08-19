import { useState, useEffect } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import { useNotify } from "./useNotify";
import { useTranslation } from "./useTranslation";
import { useAuth } from "./useAuth";
// import utils
import { errorCatch } from "@/api/api.helper";
// import types
import { IProduct } from "@/interfaces/products.interface";
// import service
import { FavoritesService } from "@/services/favorites/favorites.service";

interface IHook {
    isLiked: boolean,
    disabled: boolean,
    wishlistActions: (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => void,
    addProductToWishlist: (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => Promise<number>,
    removeProductFromWishlist: (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => Promise<string>,
}

export const useWishlist = (item: IProduct): IHook => {
    // hooks
    const { products } = useTypedSelector((state) => state.wishlist);
    const { addToWishlist, removeFromWishlist } = useActions();
    const { notify } = useNotify();
    const { dict } = useTranslation();
    const { isAuthorised } = useAuth();

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => setIsLiked(products.some(product => product.id === item.id)), [products]);

    const addProductToWishlist = async (e: React.MouseEvent<HTMLButtonElement>, product: IProduct): Promise<number> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            addToWishlist(product);
            notify({ msg: dict.wishlist.add, variant: "success" });
            setDisabled(false);
            return 0;
        }

        try {
            const response = await FavoritesService.add(product.id);
            addToWishlist(product);
            notify({ msg: dict.wishlist.add, variant: "success" });
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return 0;
        } finally {
            setDisabled(false);
        }
    };

    const removeProductFromWishlist = async (e: React.MouseEvent<HTMLButtonElement>, product: IProduct): Promise<string> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            removeFromWishlist(product.id);
            notify({ msg: dict.wishlist.remove, variant: "success" });
            setDisabled(false);
            return "";
        }

        try {
            const response = await FavoritesService.remove(product.id);
            removeFromWishlist(product.id);
            notify({ msg: dict.wishlist.remove, variant: "success" });
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return errorCatch(error);
        } finally {
            setDisabled(false);
        }
    };

    const wishlistActions = async (e: React.MouseEvent<HTMLButtonElement>, product: IProduct) => {
        e.stopPropagation();

        if (!isLiked) {
            await addProductToWishlist(e, product);
        } else {
            await removeProductFromWishlist(e, product);
        }
    };

    return {
        isLiked,
        disabled,
        wishlistActions,
        addProductToWishlist,
        removeProductFromWishlist,
    }
};