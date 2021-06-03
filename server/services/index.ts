import { asClass } from 'awilix';

import CategoryService from './CategoryService';
import ProductService from './ProductService';
import UserService from './UserService';

export interface IServicesContainer {
    CategoryService: CategoryService;
    ProductService: ProductService;
    UserService: UserService;
}

export default {
    CategoryService: asClass(CategoryService).singleton(),
    ProductService: asClass(ProductService).singleton(), 
    UserService: asClass(CategoryService).singleton(),
}