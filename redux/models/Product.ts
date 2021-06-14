import { xRead } from 'modules';
import { put, take, call } from 'redux-saga/effects';
import { action } from 'redux/action';
import Review from './Review';
import User, { FETCH_USER, requestUser } from './User'

export default interface Product {
    _id: string;
    user: User;
    reviews: Array<Review>;
    name: string;
    price: number;
    color: string;
    transmission: string;
    engine: string;
    description: string;
    image: string;
    // @prop({ ref: Category }, WhatIsIt.ARRAY)
    // public categories: mongoose.Types.Array<Category>

    // @prop({ ref: User })
    // public user: User

    // @prop({ type: () => Review })
    // public reviews: Review[];
}

export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const REQUEST_FEATURED_PRODUCTS = 'REQUEST_USER';

export const fetchFeaturedProducts = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
export const requestFeaturedProducts = (data: any) => action(REQUEST_FEATURED_PRODUCTS, data);  

export function* watchFetchFeaturedProducts() {
    while (true) {
        const action = yield take(FETCH_FEATURED_PRODUCTS);
        const data = yield call(xRead, 'products/featured');

        yield put(requestFeaturedProducts(data));
    }
}

