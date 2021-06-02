import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'categories' } })
export class Category {
    @prop({ type: String })
    public name: string;

    @prop({ type: String })
    public description: string;
}

export type CategoryType = mongoose.Model<DocumentType<Category>, {}> & Category;
export default getModelForClass(Category);