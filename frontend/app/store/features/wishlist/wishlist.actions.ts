import { createAction } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/products.interface";

export const addToWishlist = createAction<IProduct>('wishlist/addToWishlist');
export const addProductsToWishlist = createAction<IProduct[]>('wishlist/addProductsToWishlist');
export const removeFromWishlist = createAction<number>('wishlist/removeFromWishlist');