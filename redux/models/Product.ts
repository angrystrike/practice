import { xRead } from 'modules';
import { put, take, call } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Category } from 'server/models/Category';
import Review from './Review';
import User from './User'

export default interface Product {
    _id: string;
    user: User;
    reviews: Array<Review>;
    categories: Array<Category>;
    name: string;
    price: number;
    color: string;
    transmission: string;
    engine: string;
    description: string;
    image: string;
}

export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const REQUEST_FEATURED_PRODUCTS = 'REQUEST_FEATURED_PRODUCTS';

export const fetchFeaturedProducts = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
export const requestFeaturedProducts = (data: any) => action(REQUEST_FEATURED_PRODUCTS, data);  

export function* watchFetchFeaturedProducts() {
    while (true) {
        const fetchedData = yield take(FETCH_FEATURED_PRODUCTS);
        const products = yield call(xRead, '/products/featured', fetchedData);

        yield put(requestFeaturedProducts(products));
    }
}

