import mongoose from 'mongoose'
import User from '../../server/models/User'
import Product from '../../server/models/Product'
import { successResult, errorResult } from '../../server/server'

const userRouter = require('express').Router()

//userRouter.param('id', /^\d+$/)

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

module.exports = userRouter
