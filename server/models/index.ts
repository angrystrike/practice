import CategoryModel, { CategoryType } from './Category';
import ProductModel, { ProductType } from './Product';
import UserModel, { UserType } from './User';
import { asValue } from 'awilix';

export interface IModelContainer {
    CategoryModel: CategoryType;
    ProductModel: ProductType;
    UserModel: UserType;
}

export default {
    CategoryModel: asValue(CategoryModel),
    ProductModel: asValue(ProductModel),
    UserModel: asValue(UserModel),
}