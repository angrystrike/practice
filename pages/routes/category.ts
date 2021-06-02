import mongoose from 'mongoose'
import User from '../../server/models/User'
import Category from '../../server/models/Category'
import { successResult, errorResult } from '../../server/server'

const categoryRouter = require('express').Router()

categoryRouter.get('/', (req, res) => {
    const result = Category.find({})
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

module.exports = categoryRouter
