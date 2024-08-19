import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/products.interface";
import { actionsLS } from "@/utils/actionsLS";
import { addToWishlist, removeFromWishlist, addProductsToWishlist } from "./wishlist.actions";

interface IInitialState {
    products: IProduct[],
}

const initialState: IInitialState = {
    products: [],
};

export const WISHLIST = "wishlist";

export const wishlistSlice = createSlice({
    name: WISHLIST,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToWishlist, (state, action) => {
            state.products.push(action.payload);
            actionsLS.setItem(WISHLIST, state.products);
        }).addCase(removeFromWishlist, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            actionsLS.setItem(WISHLIST, state.products);
        }).addCase(addProductsToWishlist, (state, action) => {
            state.products = state.products = action.payload;
            actionsLS.setItem(WISHLIST, state.products);
        })
    }
});