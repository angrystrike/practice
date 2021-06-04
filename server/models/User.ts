import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref, pre } from '@typegoose/typegoose';
import { Product, ProductType } from './Product'
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import bcrypt from 'bcrypt';

export enum UserRole {
    admin = 'admin',
    user = 'user'
}

@pre<User>('save', function (next) { // or @pre(this: Car, 'save', ...
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, 10, (hashError: Error, encrypted: string) => {
        if (hashError) {
            return next(hashError);
        }

        // replace a password string with hash value
        this.password = encrypted;
        return next();
    });
})

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
    
    @prop({ type : String })
    public email: string;  

    @prop({ type : String })
    public firstName: string;

    @prop({ type : String })
    public lastName: string;

    @prop({ type: ()=> String, enum: Object.values(UserRole) })
    public role: UserRole;

    @prop({ type : String })
    public password: string;
    
    @prop({ type : String })
    public image: string;
}

export type UserType = mongoose.Model<DocumentType<User>, {}> & User;
export default getModelForClass(User);