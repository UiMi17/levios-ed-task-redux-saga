import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productsReducer from "./productsSlice"
import productsSaga from "./productsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: productsReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(productsSaga);

export default store;