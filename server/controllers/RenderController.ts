import { GET, route } from "awilix-express";
import BaseContext from "../BaseContext";
import { Request, Response } from 'express';

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    home(req: Request, res: Response) {
        console.log('RenderController');
        // const code = req.ssrData;
        return res.print('/');
    }
}