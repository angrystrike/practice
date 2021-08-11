import { take, call } from 'redux-saga/effects';
import { action } from 'redux/action';
import { Review } from './Review';
import { User } from './User'
import { Category } from './Category';
import Entity from './Entity';
import { schema } from 'normalizr';
import { ENTITIES } from 'server/common';


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
        super(ENTITIES.PRODUCTS, {
            user: new schema.Entity(ENTITIES.USERS),
            reviews: [new schema.Entity(ENTITIES.REVIEWS)],
            //categories: [new schema.Entity(ENTITIES.CATEGORIES)]
        });
    }

    public * fetchFeaturedProducts() {
        while (true) {
            const data = yield take('fetchFeaturedProducts'.toUpperCase());
            console.log('data', data);
            
            yield call(this.xRead, 'products/featured', data);
        }
    }

    public * fetchProduct() {
        while (true) {
            const { productId } = yield take('fetchProduct'.toUpperCase());
            console.log('PRODUCT DATA', productId);
            
            yield call(this.xRead, 'products/' + productId);
        }
    }

    public * fetchSimilarProducts() {
        while (true) {
            const { productId } = yield take('fetchSimilarProducts'.toUpperCase());
        
            yield call(this.xRead, 'products/similar/' + productId);
        }
    }
}

const productEntity = new ProductEntity();
export default productEntity;


