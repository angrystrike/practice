import mongoose from 'mongoose'
import Product from '../models/Product'
import BaseContext from '../BaseContext';

import { Request, Response } from 'express';
import { route, GET, POST, DELETE, PUT, before } from 'awilix-express';
import statusCode from '../../http-status'

@route('/products')
export default class ProductController extends BaseContext {

    @GET()
    @route('/featured')
    getFeatured(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.findFeatured()
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST)) 
    }

    @GET()
    @route('/similar/:id')
    getSimilar(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.findSimilar(req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST)) 
    }

    @GET()
    @route('/search/:text')
    search(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.findByNameOrDescription(req.params.text)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST)) 
    }

    @GET()
    @route('/')
    getAll(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.findAll()
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @POST()
    @route('/save/:id')
    save(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.save(req.body, req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @GET()
    @route('/:id')
    getByID(req: Request, res: Response) {
        const { ProductService } = this.di;
        
        const result = ProductService.findOneByID(req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }

    @DELETE()
    @route('/:id')
    delete(req: Request, res: Response) {
        const { ProductService } = this.di;

        const result = ProductService.deleteByID(req.params.id)
            .then((data) => res.answer(data, "Success", statusCode.OK))
            .catch((err) => res.answer(null, err, statusCode.BAD_REQUEST))
    }
}
