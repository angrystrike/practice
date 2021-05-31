import Test from '../../../server/models/Test'
import Product from '../../../server/models/User'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            // res.status(400).json({ success: true })
            // try {
            //     const users = await User.find({}) 
            //     res.status(200).json({ success: true, data: {"test123": users }})
            // } catch (error) {
            //     res.status(400).json({ success: false })
            // }
            try {
                const products = await Product.find({}) 
                res.status(200).json({ success: true, data: {"test123": products }})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break     
        default:
            res.status(400).json({ success: false })
            break
    }
}