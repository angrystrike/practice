import { GET, route } from "awilix-express";
import BaseContext from "../BaseContext";
import { Request, Response } from 'express';

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    home(req: Request, res: Response) {
        console.log('RenderController');
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
        return res.print('/product/' + req.params.id);
    }
}