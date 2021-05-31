import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';
import { Product } from './Product';

@modelOptions({ schemaOptions: { collection: 'categories' } })
export class Category {
    @prop({ ref: () => Product })
    public products?: Ref<Product>[];

    @prop()
    public name: string;

    @prop()
    public description: string;
}

export type CategoryType = mongoose.Model<DocumentType<Category>, {}> & Category;
export default getModelForClass(Category);