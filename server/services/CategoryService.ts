import BaseContext from '../BaseContext';

export default class CategoryService extends BaseContext {

    public find() {
        const { Category } = this.di;
        return Category.find({});       
    }
}