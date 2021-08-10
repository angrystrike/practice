import { User } from '../models/User';
import BaseContext from '../BaseContext';

export default class ProductService extends BaseContext {

    public findByCategory(id) {
        const { ProductModel } = this.di;
        return ProductModel.find({}).populate('categories').where('categories._id', id);
    }

    public async findSimilar(id) {
        const { ProductModel } = this.di;
        const product = await ProductModel.findById(id); 
        
        return ProductModel.find({_id : {$ne : id}})
            .where('engine', product.engine)
            .where('transmission', product.transmission)
            .populate('user')
            .populate('reviews.user')
            .limit(3);
    }

    public findByNameOrDescription(text) {
        const { ProductModel } = this.di;
        return ProductModel.find({
            $or: [{
                name: { $regex: text, $options: 'i' }
            }, {
                description: { $regex: text, $options: 'i' }
            }]
        }).limit(5);
    }

    public findFeatured() {
        const { ProductModel } = this.di;
        return ProductModel.find({}).where('featured', true).sort({'price': -1}).populate('reviews.user').populate('user').populate("reviews").limit(4);
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
        return ProductModel.findById(id).populate('user').populate('reviews.user'); 
    }

    public deleteByID(id) {
        const { ProductModel } = this.di;
        return ProductModel.findByIdAndDelete(id);
    }
}