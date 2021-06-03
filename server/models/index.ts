import Category, { CategoryType } from './Category';
import Product, { ProductType } from './Product';
import User, { UserType } from './User';
import { asValue } from 'awilix';

export interface IModelContainer {
    Category: CategoryType;
    Product: ProductType;
    User: UserType;
}

export default {
    Category: asValue(Category),
    Product: asValue(Product),
    User: asValue(User),
}