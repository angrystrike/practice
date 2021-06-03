import mongoose from 'mongoose'
import User from '../models/User'
import Category from '../models/Category'
import { successResult, errorResult } from '../server'

const categoryRouter = require('express').Router()

categoryRouter.get('/', (req, res) => {
    const result = Category.find({})
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

categoryRouter.post('/', (req, res) => {
    const result = Category.create(req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

categoryRouter.delete('/:id', (req, res) => {
    const result = Category.findByIdAndRemove(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

categoryRouter.put('/:id', (req, res) => {
    const result = Category.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch categories"))
})

module.exports = categoryRouter
