import mongoose from 'mongoose'
import User from '../../../server/models/User'
import Product from '../../../server/models/Product'
import Test from '../../../server/models/Test'
import Category from '../../../server/models/Category'

export default async function handler(req, res){
    const { method } = req
    const ObjectId = mongoose.Types.ObjectId;

    //const result = await Product.find({}).populate('category').populate('user').populate('reviews');
    const result = await User.find({})
    // const result = await Category.find({})

    console.log('result', result);
    switch (method) {
        case 'GET':
            try {
                res.status(200).json({ success: true, data: result })
            }
            catch(err) {
                res.status(400).json({ success: false, data: result })
            }
            break

        case 'POST':
            try{
                res.status(200).json({success: true, data: result})
            }
            catch(err){
                res.status(400).json({success: false})
        }
            break
        default:
            res.status(400).json({ success: false })
            break

    }
} 