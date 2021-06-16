import { put, take, call, select } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Category } from 'server/models/Category';
import Review, { reviewEntity } from './Review';
import User, { userEntity } from './User'
import { normalize, schema } from 'normalizr';
import { SchemaType } from 'mongoose';
import { categoryEntity } from './Category';
import Entity from './Entity';


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

export class ProductEntity extends Entity {
    constructor(schema) {
        super(schema);
    }

    public static addWatcher(func : Function) {
        this.getWatchers().push(func);
    }
    
}

const productSchema = new schema.Entity('products', {
    user: userEntity,
    reviews: [reviewEntity],
    categories: [categoryEntity]
}, {
    idAttribute: '_id'
});

const productEntity = new ProductEntity(productSchema);


export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const REQUEST_FEATURED_PRODUCTS = 'REQUEST_FEATURED_PRODUCTS';

export const fetchFeaturedProducts = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
export const requestFeaturedProducts = (data: any) => action(REQUEST_FEATURED_PRODUCTS, data);  

export function* watchFetchFeaturedProducts() {
    while (true) {
        console.log('watchFetchFeaturedProducts');
        
        const fetchedData = yield take(FETCH_FEATURED_PRODUCTS);
        yield call(productEntity.xRead, 'products/featured', fetchedData, requestFeaturedProducts);
        ProductEntity.addWatcher(watchFetchFeaturedProducts);
        console.log('Product wachers', ProductEntity.getWatchers());
        
        // console.log('Start: ', products);
        
        // const normalizedData = normalize(products.data, [productEntity]);
        // console.log('Normalized: ', normalizedData);
        
        // yield put(requestFeaturedProducts(normalizedData));
    }
}


export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';

export const fetchProduct = (productId: string | string[]) => action(FETCH_PRODUCT, { productId });
export const requestProduct = (data: any) => action(REQUEST_PRODUCT, data);  

export function* watchFetchProduct() {
    while (true) {
        const data = yield take(FETCH_PRODUCT);

        const products = yield select(state => state.products);
        const item = products.find(o => o._id === data.productId);
        if (!item) {
            const product = yield call(xRead, 'products/' + data.productId);
            yield put(requestProduct(product)); 
        }
    }
}

export const FETCH_SIMILAR_PRODUCTS = 'FETCH_SIMILAR_PRODUCTS';
export const REQUEST_SIMILAR_PRODUCTS = 'REQUEST_SIMILAR_PRODUCTS';

export const fetchSimilarProducts = (productId: string | string[]) => action(FETCH_SIMILAR_PRODUCTS, { productId });
export const requestSimilarProducts = (data: any) => action(REQUEST_SIMILAR_PRODUCTS, data);  

export function* watchFetchSimilarProducts() {
    while (true) {
        const data = yield take(FETCH_SIMILAR_PRODUCTS);

        const products = yield select(state => state.products);
        const item = products.find(o => o._id !== data.productId);
        if (!item) {
            const product = yield call(xRead, 'products/similar/' + data.productId);
            yield put(requestSimilarProducts(product)); 
        }
    }
}



