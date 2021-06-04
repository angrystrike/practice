import mongoose from 'mongoose'
import Product from '../models/Product'
import BaseContext from '../BaseContext';

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
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @POST()
    @route('/save/:id')
    save(req: Request, res: Response) {
        const { UserService } = this.di;

        const result = UserService.save(req.body, req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/:id')
    getByID(req: Request, res: Response) {
        const { UserService } = this.di;
        
        const result = UserService.findOneByID(req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @DELETE()
    @route('/:id')
    delete(req: Request, res: Response) {
        const { UserService } = this.di;

        const result = UserService.deleteByID(req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }
}
