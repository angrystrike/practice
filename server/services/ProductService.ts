import BaseContext from '../BaseContext';

export default class ProductService extends BaseContext {

    public find() {
        const { Product } = this.di;
        return Product.find({});       
    }
}