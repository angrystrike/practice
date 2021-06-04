import BaseContext from '../BaseContext';

export default class ProductService extends BaseContext {

    public findByNameOrDescription(text) {
        const { ProductModel } = this.di;
        return ProductModel.find({
            $or: [{
                name: { $regex: text, $options: 'i' }
            }, {
                description: { $regex: text, $options: 'i' }
            }]
        })
    }

    public findFeatured() {
        const { ProductModel } = this.di;
        return ProductModel.find().where('featured', true).sort({"price": -1}).limit(4);
    }

    public findAll() {
        const { ProductModel } = this.di;
        return ProductModel.find({});
    }

    public async save(body, id) {
        const { ProductModel } = this.di;
        let product = await ProductModel.findById(id);
        if (product) {
            product.set(body);
        } else {
            product = new ProductModel(body);
        }
        return product.save();
    }

    public findOneByID(id) {
        const { ProductModel } = this.di;
        return ProductModel.findById(id);
    }

    public deleteByID(id) {
        const { ProductModel } = this.di;
        return ProductModel.findByIdAndDelete(id);
    }
}