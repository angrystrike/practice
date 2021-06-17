import { put, take, call, select } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Category } from 'server/models/Category';
import Review, { reviewEntity } from './Review';
import User, { userEntity } from './User'
import { normalize, schema } from 'normalizr';
import { SchemaType } from 'mongoose';
import { categoryEntity } from './Category';
import Entity from './Entity';


export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_SIMILAR_PRODUCTS = 'FETCH_SIMILAR_PRODUCTS';

export const fetchFeaturedProducts = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
export const fetchProduct = (productId: string | string[]) => action(FETCH_PRODUCT, { productId });
export const fetchSimilarProducts = (productId: string | string[]) => action(FETCH_SIMILAR_PRODUCTS, { productId });


export interface Product {
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

    constructor() {
        super("products", {
            user: userEntity,
            reviews: [reviewEntity],
            categories: [categoryEntity]
        });

        this.watchFetchFeaturedProducts = this.watchFetchFeaturedProducts.bind(this);
        this.watchFetchProduct = this.watchFetchProduct.bind(this);
        this.watchFetchSimilarProducts = this.watchFetchSimilarProducts.bind(this);

        ProductEntity.addWatcher([
            this.watchFetchFeaturedProducts,
            this.watchFetchProduct,
            this.watchFetchSimilarProducts
        ]);
    }

    public * watchFetchFeaturedProducts() {
        while (true) {
            const data = yield take(FETCH_FEATURED_PRODUCTS);
            yield call(this.xRead, 'products/featured', data);
        }
    }

    public * watchFetchProduct() {
        while (true) {
            const data = yield take(FETCH_PRODUCT);
            yield call(this.xRead, 'products/' + data.productId, data);
            // const products = yield select(state => state.products);
            // const item = products.find(o => o._id === data.productId);
            // if (!item) {
            //     const product = yield call(this.xRead, 'products/' + data.productId);
            //     yield put(requestProduct(product));
            // }
        }
    }

    public * watchFetchSimilarProducts() {
        while (true) {
            const data = yield take(FETCH_SIMILAR_PRODUCTS);
            yield call(this.xRead, 'products/similar/' + data.productId, data);
            // const data = yield take(FETCH_SIMILAR_PRODUCTS);

            // const products = yield select(state => state.products);
            // const item = products.find(o => o._id !== data.productId);
            // if (!item) {
            //     const product = yield call(this.xRead, 'products/similar/' + data.productId);
            //     yield put(requestSimilarProducts(product)); 
            // }
        }
    }
}

const productEntity = new ProductEntity();
export default productEntity;


