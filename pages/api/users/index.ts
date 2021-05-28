import User from '../../../server/models/User'

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({}) /* find all the data in our database */
                res.status(200).json({ success: true, data: {"test": users }})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const user = await User.create(
                    req.body
                )
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}