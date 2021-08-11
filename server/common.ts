export enum ROLE {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin',
}

export interface IIdentity {
    id: any;
    firstName: string,
    lastName: string,
    email: string;
    token?: string;
    role: ROLE;
}

export interface SagaAction {
    saga: Function;
    trigger: Function;
    constant : string;
}

export enum ENTITIES {
    USERS = 'users',
    PRODUCTS = 'products',
    REVIEWS = 'reviews',
    CATEGORIES = 'categories'
}


export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object