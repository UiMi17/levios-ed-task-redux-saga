import {productsReducer} from "./slice";
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    }, devTools: process.env.NODE_ENV !== 'production',
});
