import mongoose from 'mongoose'
// import UserModel from '../models/User'
import Product from '../models/Product'
import BaseContext from '../BaseContext';

import { successResult, errorResult } from '../server'
import { Request, Response } from 'express';
import { route, GET, POST, DELETE, PUT, before } from 'awilix-express';
import statusCode from '../../http-status'

@route('/users')
export default class UserController extends BaseContext {

    @GET()
    @route('/')
    getAll(req: Request, res: Response) {
        const { UserService } = this.di;

        const result = UserService.findAll()
            .then((data) => res.answer(data, ""))
            .catch((err) => res.answer(res, err, "Cant fetch users"))
    }

    @POST()
    @route('/:id')
    save(req: Request, res: Response) {
        const { UserService } = this.di;

        const result = UserService.save(req.body)
            .then((data) => res.answer(res, data, ""))
            .catch((err) => res.answer(res, err, "Cant fetch users"))
    }

    @GET()
    @route('/:id')
    getByID(req: Request, res: Response) {
        const { UserService } = this.di;
        console.log('get: ' + req.params.id)
        const result = UserService.findOneByID(req.params.id)
            .then((data) => res.answer(res, data, statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @DELETE()
    @route('/:id')
    delete(req: Request, res: Response) {
        const { UserService } = this.di;

        const result = UserService.deleteByID(req.params.id)
            .then((data) => res.answer(res, data, ""))
            .catch((err) => res.answer(res, err, "Cant delete user"))
    }
}
