import {createSlice} from '@reduxjs/toolkit';

const initialState = {isLoading: false, products: [], error: null}

const productsSlice = createSlice({
    name: 'products', initialState, reducers: {
        PRODUCTS_FETCH: (state, {payload}) => {
            state.products = payload;
            state.error = null;
        }, PRODUCTS_FETCH_LOADING: (state, {payload}) => {
            state.isLoading = payload;
        }, PRODUCTS_FETCH_FAIL: (state, {payload}) => {
            state.error = payload;
        },
    },
});

export const {PRODUCTS_FETCH, PRODUCTS_FETCH_FAIL, PRODUCTS_FETCH_LOADING} = productsSlice.actions;

export default productsSlice.reducer;