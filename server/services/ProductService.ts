import BaseContext from '../BaseContext';

export default class ProductService extends BaseContext {

    public find() {
        const { ProductModel } = this.di;
        return ProductModel.find({});       
    }
}