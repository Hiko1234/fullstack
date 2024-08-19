import { createSlice } from "@reduxjs/toolkit";
import { IProductCart } from "@/interfaces/products.interface";
import { actionsLS } from "@/utils/actionsLS";
import {
    addToCart,
    addProductsToCart,
    removeFromCart,
    incrementProductCart,
    decrementProductCart,
    clearCart,
} from "./cart.actions";

interface IInitialState {
    products: IProductCart[],
}

const initialState: IInitialState = {
    products: [],
};

export const CART = "cart";

export const cartSlice = createSlice({
    name: CART,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart, (state, action) => {
            const findProduct = state.products.find((item) => item.id === action.payload.id);
            if (findProduct) {
                findProduct.quantity = findProduct.quantity + action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            actionsLS.setItem(CART, state.products);
        }).addCase(removeFromCart, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            actionsLS.setItem(CART, state.products);
        }).addCase(addProductsToCart, (state, action) => {
            state.products = state.products = action.payload;
            actionsLS.setItem(CART, state.products);
        }).addCase(incrementProductCart, (state, action) => {
            const findProduct = state.products.find((item) => item.id === action.payload.id);
            if (findProduct) {
                findProduct.quantity++;
                actionsLS.setItem(CART, state.products);
            }
        }).addCase(decrementProductCart, (state, action) => {
            const findProduct = state.products.find((item) => item.id === action.payload.id);
            if (findProduct) {
                findProduct.quantity--;
                actionsLS.setItem(CART, state.products);
            }
        }).addCase(clearCart, (state) => {
            state.products = [];
        })
    }
});