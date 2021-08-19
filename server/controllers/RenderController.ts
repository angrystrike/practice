import { GET, route } from "awilix-express";
import BaseContext from "../BaseContext";
import { Request, Response } from 'express';
import { ENTITIES } from '../common';

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    home(req: Request, res: Response) {
        const { ProductService } = this.di;
        return ProductService.findFeatured()
            .then(products => {
                return res.print('/', {
                    [ENTITIES.PRODUCTS]: products,
                });                
            })
            .catch((err: any) => {
                console.error('RenderController.home()', err);
            });
    }

    @GET()
    @route('/search/:text')
    searchPage(req: Request, res: Response) {
        return res.print('/search/' + req.params.text);
    }

    @GET()
    @route('/product/:id')
    product(req: Request, res: Response) {
        const { ProductService } = this.di;
        return Promise.all([
            ProductService.findOneByID(req.params.id),
            ProductService.findSimilar(req.params.id)
            
        ]) 
        .then(values => {
            values[1].push(values[0])
            return res.print('/product/' + req.params.id, { 
                [ENTITIES.PRODUCTS]: values[1],
            });
            
        })
        .catch((err: any) => {
            console.error('RenderController.product()', err);
        });
    }
}