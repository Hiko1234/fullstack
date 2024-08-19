import { createAction } from "@reduxjs/toolkit";
import { IProductCart } from "@/interfaces/products.interface";

export const addToCart = createAction<IProductCart>('cart/addToCart');
export const addProductsToCart = createAction<IProductCart[]>('cart/addProductsToCart');
export const removeFromCart = createAction<number>('cart/removeFromCart');
export const clearCart = createAction('cart/clearCart');
export const incrementProductCart = createAction<IProductCart>('cart/increment');
export const decrementProductCart = createAction<IProductCart>('cart/decrement');