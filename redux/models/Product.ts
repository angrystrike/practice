import { call } from 'redux-saga/effects';
import Review from './Review';
import { User } from './User'
import Category from './Category';
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

export class ProductEntity extends Entity {
    constructor() {
        super(ENTITIES.PRODUCTS, {
            user: new schema.Entity(ENTITIES.USERS),
            reviews: [new schema.Entity(ENTITIES.REVIEWS)],
            categories: [new schema.Entity(ENTITIES.CATEGORIES)]
        });
    }

    public * fetchFeaturedProducts(data) {
        yield call(this.xRead, 'products/featured', data);
    }

    public * fetchProduct(data) {
        yield call(this.xRead, 'products/' + data.productId);
    }

    public * fetchSimilarProducts(data) {
        yield call(this.xRead, 'products/similar/' + data.productId);
    }
}

const productEntity = new ProductEntity();
export default productEntity;


