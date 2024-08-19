'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import slices
import { userSlice } from './features/user/user.slice';
import { wishlistSlice } from './features/wishlist/wishlist.slice';
import { cartSlice } from './features/cart/cart.slice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    wishlist: wishlistSlice.reducer,
    cart: cartSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;