import mongoose from 'mongoose'
import { prop, modelOptions, getModelForClass, DocumentType, Ref } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: {collection: 'test' }})
export class Test {
    
    @prop({ type: String })
    public email: string

    @prop({ type: String })
    public firstName: string
}

export default getModelForClass(Test)