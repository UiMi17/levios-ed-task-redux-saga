import { call, put, takeEvery } from 'redux-saga/effects';
import {fetchProducts as getProducts} from "../services/mockAPI";

function* fetchProducts() {
    try {
        yield put({type: 'products/PRODUCTS_FETCH_LOADING', payload: true});
        const products = yield call(getProducts);
        yield put({type: 'products/PRODUCTS_FETCH', payload: products});
        yield put({type: 'products/PRODUCTS_FETCH_LOADING', payload: false});
    } catch (e) {
        yield put({type: 'products/PRODUCTS_FETCH_FAIL', payload: e.message});
        yield put({type: 'products/PRODUCTS_FETCH_LOADING', payload: false});
    }
}

function* productsSaga() {
    yield takeEvery('WATCH_PRODUCTS_FETCH', fetchProducts);
}

export default productsSaga;