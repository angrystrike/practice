import { GET, route } from "awilix-express";
import BaseContext from "../BaseContext";
import { Request, Response } from 'express';
import { ENTITIES } from '../common';

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    home(req: Request, res: Response) {
        return res.print('/');
    }

    @GET()
    @route('/search/:text')
    search(req: Request, res: Response) {
        return res.print('/search/' + req.params.text);
    }

    @GET()
    @route('/product/:id')
    product(req: Request, res: Response) {
        const { ProductService } = this.di;


        /*
        return Promise.all([
            SolutionService.getTopSolutions().lean(),
            PageService.findPageByName('home').lean(),
        ])
        */

       
        // const product = ProductService.findOneByID(req.params.id).lean();
        // const similar = ProductService.findSimilar(req.params.id).then((values) => {
        //     return values.map((element) => { 
        //         element = element.toObject();
        //         element.lean() 
        //     });
        // })


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