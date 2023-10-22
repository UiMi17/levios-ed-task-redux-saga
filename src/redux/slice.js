import {createSlice} from '@reduxjs/toolkit';
import {fetchProductsThunk} from "./operations";

const initialState = {
    products: {
        items: [],
        isLoading: false,
        error: null,
    },
    filter: '',
};

const productsSlice = createSlice({
    name: "@@products", initialState, reducers: {
        setFilter: (state, {payload}) => {
            state.filter = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductsThunk.pending, (state) => {
            state.products.isLoading = true;
        }).addCase(fetchProductsThunk.fulfilled, (state, {payload}) => {
            state.products.items = payload;
        }).addMatcher(action => action.type.endsWith("/rejected"), (state, {payload}) => {
            state.products.isLoading = false;
            state.products.error = payload;
        }).addMatcher(
            action => action.type.endsWith('/fulfilled'),
            state => {
                state.products.isLoading = false;
            }
        );
    }
})

export const {setFilter} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;