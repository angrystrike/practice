import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'

@modelOptions({schemaOptions: {collection: 'test'}})
export class Test {
    
    @prop()
    public email?: string

    @prop()
    public firstName?: string
}

export default getModelForClass(Test)