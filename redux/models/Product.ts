import { take, call } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Category } from 'server/models/Category';
import Review, { reviewEntity } from './Review';
import userEntity, { User } from './User'
import { categoryEntity } from './Category';
import Entity from './Entity';
import { schema } from 'normalizr';
import { ENTITIES } from 'server/common';


export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_SIMILAR_PRODUCTS = 'FETCH_SIMILAR_PRODUCTS';

export const fetchFeaturedProducts = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
export const fetchProduct = (productId: string | string[]) => action(FETCH_PRODUCT, { productId });
export const fetchSimilarProducts = (productId: string | string[]) => action(FETCH_SIMILAR_PRODUCTS, { productId });


export interface Product {
    id: string;
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
        super(ENTITIES.PRODUCTS, {
            user: new schema.Entity(ENTITIES.USERS),
            reviews: [new schema.Entity(ENTITIES.REVIEWS)],
            //categories: [new schema.Entity(ENTITIES.CATEGORIES)]
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
            console.log('Start wathc fetch');
            
            const data = yield take(FETCH_PRODUCT);
            console.log('watchFetchProduct');
            
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


