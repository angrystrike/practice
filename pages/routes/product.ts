import mongoose from 'mongoose'
import User from '../../server/models/User'
import Product from '../../server/models/Product'
import { successResult, errorResult } from '../../server/server'

const productRouter = require('express').Router()

productRouter.get('/search/:model', (req, res) => {
    console.log(req.params.model)
    const result = Product.find({ name: {$regex: req.params.model, $options: 'i'}} )
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})

productRouter.get('/featured', (req, res) => {
    const result = Product.find().where('featured', true).sort('price').limit(4)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch featured products"))
})

productRouter.get('/:id', (req, res) => {
    const result = Product.findById(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch featured products"))
})



module.exports = productRouter
