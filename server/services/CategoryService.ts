import BaseContext from '../BaseContext';

export default class CategoryService extends BaseContext {

    public findAll() {
        const { CategoryModel } = this.di;
        return CategoryModel.find({});       
    }

    public async save(body, id) {
        const { CategoryModel } = this.di;
        let category = await CategoryModel.findById(id);
        if (category) {
            category.set(body);
        } else {
            category = new CategoryModel(body);
        }
        return category.save();
    }

    public findOneByID(id) {
        const { CategoryModel } = this.di;
        return CategoryModel.findById(id);
    }

    public deleteByID(id) {
        const { CategoryModel } = this.di;
        return CategoryModel.findByIdAndDelete(id);
    }
}