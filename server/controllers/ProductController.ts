import mongoose from 'mongoose'
import User from '../models/User'
import Product from '../models/Product'
import { successResult, errorResult } from '../server'

const productRouter = require('express').Router()

productRouter.post('/', (req, res) => {
    const result = Product.create(req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant add product"))
})

productRouter.get('/search/:text', (req, res) => {
    const result = Product.find({ $or:[{ name: { $regex: req.params.text, $options: 'i' } }, { description : { $regex: req.params.text, $options: 'i' } }]} )
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})

productRouter.get('/featured', (req, res) => {
    const result = Product.find().where('featured', true).sort({"price": -1}).limit(4)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})

productRouter.get('/:id', (req, res) => {
    const result = Product.findById(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch product"))
})

productRouter.get('/', (req, res) => {
    const result = Product.find({})
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})

productRouter.delete('/:id', (req, res) => {
    const result = Product.findByIdAndRemove(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})

productRouter.put('/:id', (req, res) => {
    const result = Product.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch products"))
})


module.exports = productRouter
