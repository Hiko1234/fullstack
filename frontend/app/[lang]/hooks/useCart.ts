import { useState } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import { useNotify } from "./useNotify";
import { useTranslation } from "./useTranslation";
import { useAuth } from "./useAuth";
// import utils
import { errorCatch } from "@/api/api.helper";
// import types
import { IProductCart } from "@/interfaces/products.interface";
// import service
import { CartsService } from "@/services/cart/cart.service";

interface IHook {
    disabled: boolean,
    totalPrice: () => number,
    totalLength: () => number,
    length: () => number,
    products: IProductCart[],
    addProductToCart: (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart) => Promise<string>,
    removeProductFromCart: (e: React.MouseEvent<HTMLButtonElement>, productId: number) => Promise<string>,
    incProductCart: (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart) => Promise<string>,
    decProductCart: (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart) => Promise<string>,
    clearProductsCart: () => Promise<string>,
}

export const useCart = (): IHook => {
    // hooks
    const { products } = useTypedSelector((state) => state.cart);
    const {
        addToCart,
        removeFromCart,
        incrementProductCart,
        decrementProductCart,
        clearCart,
    } = useActions();
    const { notify } = useNotify();
    const { dict } = useTranslation();
    const { isAuthorised } = useAuth();

    const totalPrice = (): number => products.reduce((sum: number, item: IProductCart) => sum + (item.price * item.quantity), 0);
    const totalLength = (): number => products.reduce((sum: number, item: IProductCart) => sum + item.quantity, 0);
    const length = (): number => products.length;

    const [disabled, setDisabled] = useState<boolean>(false);

    const addProductToCart = async (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart): Promise<string> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            addToCart(product);
            notify({ msg: dict.cart.add_msg, variant: "success" });
            setDisabled(false);
            return "";
        }

        try {
            const findProduct = products.find((item) => item.id === product.id);
            const quantity = findProduct?.quantity || 0;
            const response = await CartsService.add(product.id, product.quantity + quantity);
            addToCart(product);
            notify({ msg: dict.cart.add_msg, variant: "success" });
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return "";
        } finally {
            setDisabled(false);
        }
    };

    const removeProductFromCart = async (e: React.MouseEvent<HTMLButtonElement>, productId: number): Promise<string> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            removeFromCart(productId);
            notify({ msg: dict.cart.remove_msg, variant: "success" });
            setDisabled(false);
            return "";
        }

        try {
            const response = await CartsService.remove(productId);
            removeFromCart(productId);
            notify({ msg: dict.cart.remove_msg, variant: "success" });
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return errorCatch(error);
        } finally {
            setDisabled(false);
        }
    };

    const incProductCart = async (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart): Promise<string> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            incrementProductCart(product);
            setDisabled(false);
            return "";
        }

        try {
            const response = await CartsService.add(product.id, product.quantity + 1);
            incrementProductCart(product);
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return "";
        } finally {
            setDisabled(false);
        }
    };

    const decProductCart = async (e: React.MouseEvent<HTMLButtonElement>, product: IProductCart): Promise<string> => {
        e.stopPropagation();
        setDisabled(true);

        if (!isAuthorised) {
            decrementProductCart(product);
            setDisabled(false);
            return "";
        }

        try {
            const response = await CartsService.add(product.id, product.quantity - 1);
            decrementProductCart(product);
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return "";
        } finally {
            setDisabled(false);
        }
    };

    const clearProductsCart = async (): Promise<string> => {
        setDisabled(true);

        if (!isAuthorised) {
            clearCart();
            setDisabled(false);
            return "";
        }

        try {
            const response = await CartsService.clear();
            clearCart();
            return response.data;
        } catch (error) {
            notify({ msg: dict.unknown_error, variant: "error" });
            return "";
        } finally {
            setDisabled(false);
        }
    };

    return {
        disabled,
        totalPrice,
        totalLength,
        length,
        products,
        addProductToCart,
        removeProductFromCart,
        incProductCart,
        decProductCart,
        clearProductsCart,
    }
};