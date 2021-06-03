import BaseContext from '../BaseContext';

export default class CategoryService extends BaseContext {

    public findAll() {
        const { CategoryModel } = this.di;
        return CategoryModel.find({});       
    }
}