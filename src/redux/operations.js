import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

axios.defaults.baseURL = "https://6508107256db83a34d9bae62.mockapi.io";

export const fetchProductsThunk = createAsyncThunk(
    '@@contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/products");
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);