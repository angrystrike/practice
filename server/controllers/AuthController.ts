import BaseContext from '../BaseContext';

import { Request, Response, NextFunction } from 'express';
import { route, GET, POST, DELETE, PUT, before } from 'awilix-express';
import statusCode from '../../http-status'
import passport from 'passport-local';

@route('/auth')
export default class AuthController extends BaseContext {

    @POST()
    @route('/signup')
    public register(req: Request, res: Response, next: NextFunction) {
        console.log('auth signup')
        // tslint:disable-next-line: no-shadowed-variable
        return this.di.passport.authenticate('local-signup', (errors, identity) => {
            if (errors) {
                console.log('register__errors=', errors);
                res.answer(null, errors, statusCode.BAD_REQUEST);
            } else if (identity) {
                res.answer([identity], 'You have successfully registered! Now you should be able to log in.', statusCode.OK);
            } else {
                console.log('register__catch__errors=', errors);
                res.answer(null, 'Could not process the form.', statusCode.BAD_REQUEST);
            }
        })(req, res, next);
    }
}