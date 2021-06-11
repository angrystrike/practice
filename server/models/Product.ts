import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';
import { User, UserType } from './User';
import { Category, CategoryType } from './Category';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants'

export enum ProductTransmission {
    automat = 'automat',
    manual = 'manual'
}

export enum ProductEngine {
    fuel = 'fuel',
    gas = 'gas',
    electricity = 'electricity'
}

class Review {
    @prop({ ref: User })
    public user: User;

    @prop({ type: Number })
    public mark: number;

    @prop({ type: String })
    public text: string;
}

@modelOptions({ schemaOptions: { collection: 'products' } })
export class Product {

    @prop({ ref: Category }, WhatIsIt.ARRAY)
    public categories: mongoose.Types.Array<Category>

    @prop({ ref: User })
    public user: User

    @prop({ type: () => Review }, WhatIsIt.ARRAY)
    public reviews: mongoose.Types.Array<Review>;

    @prop({ type: String })
    public name: string;  

    @prop({ type: Number })
    public price: number;

    @prop({ type: String })
    public color: string;

    @prop({ type: ()=> String, enum: Object.values(ProductTransmission) })
    public transmission: ProductTransmission; 

    @prop({ type: ()=> String, enum: Object.values(ProductEngine) })
    public engine: ProductEngine; 

    @prop({ type: String })
    public description: string;

    @prop({ type: String })
    public image: string;

}

export type ProductType = mongoose.Model<DocumentType<Product>, {}> & Product;
export default getModelForClass(Product);