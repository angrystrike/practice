import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';
import { Product, ProductType } from './Product'
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';

export enum UserRole {
    admin = 'admin',
    user = 'user'
}

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
    @prop({ ref : Product }, WhatIsIt.ARRAY)
    public products: mongoose.Types.Array<Product>

    @prop({ type : String})
    public email: string;  

    @prop({ type : String})
    public firstName: string;

    @prop({ type : String})
    public lastName: string;

    @prop({ type: ()=> String, enum: Object.values(UserRole) })
    public role: UserRole;

    @prop({ type : String})
    public password: string;
    
    @prop({ type : String})
    public image: string;
}

export type UserType = mongoose.Model<DocumentType<User>, {}> & User;
export default getModelForClass(User);