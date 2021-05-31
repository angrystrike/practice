import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';
import { User } from './User';

class ProductTransmission {
    @prop()
    public automat: string;

    @prop()
    public manual: string;
}

class ProductEngine {
    @prop()
    public fuel: string;

    @prop()
    public gas: string;

    @prop()
    public electricity: string;
}

class Review {
    @prop({ ref: () => User })
    public user: Ref<User>;

    @prop()
    public mark: number;

    @prop()
    public text: string;
}

@modelOptions({ schemaOptions: { collection: 'products' } })
export class Product {
    // @prop({ ref: () => User })
    // public user: Ref<User>;

    @prop({ type: () => Review })
    public reviews: Review[];

    @prop()
    public name: string;  

    @prop()
    public price: number;

    @prop()
    public color: string;

    @prop()
    public transmission: ProductTransmission; 

    @prop()
    public engine: ProductEngine; 

    @prop()
    public description: string;

    @prop()
    public image: string;
}

export type ProductType = mongoose.Model<DocumentType<Product>, {}> & Product;
export default getModelForClass(Product);