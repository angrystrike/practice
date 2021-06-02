import mongoose from 'mongoose'
import User from '../../server/models/User'
import Product from '../../server/models/Product'
import { successResult, errorResult } from '../../server/server'

const userRouter = require('express').Router()


userRouter.post('/', (req, res) => {
    const result = User.create(req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

userRouter.get('/', (req, res) => {
    const result = User.find({})
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

userRouter.get('/:id', (req, res) => {
    console.log(req.params.id)
    const result = User.findById(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

userRouter.delete('/:id', (req, res) => {
    const result = User.findByIdAndRemove(req.params.id)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

userRouter.put('/:id', (req, res) => {
    const result = User.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => successResult(res, data, ""))
        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

module.exports = userRouter
