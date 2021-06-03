import mongoose from 'mongoose'
import User from '../models/User'
import Product from '../models/Product'
import BaseContext from '../BaseContext';
import { successResult, errorResult } from '../server'

import { route, GET, POST, DELETE, before } from 'awilix-express';

@route('/users')
export default class UserController extends BaseContext {

    @GET()
    @route('/')
    getAll(req: Request, res: Response) {
        console.log('CONTROLLER USER')
        const { UserService } = this.di;

        const result = UserService.find()
            .then((data) => successResult(res, data, ""))
            .catch((err) => errorResult(res, err, "Cant fetch users"))
    }
}
// import { successResult, errorResult } from '../server'

// const userRouter = require('express').Router()

// userRouter.post('/', (req, res) => {
//     const result = User.create(req.body)
//         .then((data) => successResult(res, data, ""))
//         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

// userRouter.get('/', (req, res) => {
//     const result = User.find({})
//         .then((data) => successResult(res, data, ""))
//         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

// userRouter.get('/:id', (req, res) => {
//     console.log(req.params.id)
//     const result = User.findById(req.params.id)
//         .then((data) => successResult(res, data, ""))
//         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

// userRouter.delete('/:id', (req, res) => {
//     const result = User.findByIdAndRemove(req.params.id)
//         .then((data) => successResult(res, data, ""))
//         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

// userRouter.put('/:id', (req, res) => {
//     const result = User.findByIdAndUpdate(req.params.id, req.body)
//         .then((data) => successResult(res, data, ""))
//         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

// module.exports = userRouter
