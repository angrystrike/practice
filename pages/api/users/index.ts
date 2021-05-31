import Test from '../../../server/models/Test'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const test = await Test.find({}) 
                res.status(200).json({ success: true, data: {"test123": test }})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break     
        default:
            res.status(400).json({ success: false })
            break
    }
}