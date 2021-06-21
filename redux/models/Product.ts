import { take, call } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Review } from './Review';
import { User } from './User'
import { Category } from './Category';
import Entity from './Entity';
import { schema } from 'normalizr';


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

const categoryEntity = new schema.Entity('categories', {}, {
    idAttribute: '_id'
})

const userEntity = new schema.Entity('users', {}, {
    idAttribute: '_id'
})

const reviewEntity = new schema.Entity('reviews', {
    user: userEntity,
}, {
    idAttribute: '_id'
})

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
            yield call(this.xRead, 'products/' + data.productId);
        }
    }

    public * watchFetchSimilarProducts() {
        while (true) {
            const data = yield take(FETCH_SIMILAR_PRODUCTS);
            yield call(this.xRead, 'products/similar/' + data.productId);
        }
    }
}

const productEntity = new ProductEntity();
export default productEntity;


