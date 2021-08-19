import BaseContext from '../BaseContext';

import { Request, Response, NextFunction } from 'express';
import { route, GET, POST, DELETE, PUT, before } from 'awilix-express';
import statusCode from '../../http-status'
import passport from 'passport-local';
import { IIdentity } from 'server/common';

@route('/auth')
export default class AuthController extends BaseContext {

    @POST()
    @route('/register')
    public register(req: Request, res: Response, next: NextFunction) {
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

    @POST()
    @route('/login')
    public login(req: Request, res: Response, next: NextFunction) {
        console.log('login controller');

        const { passport } = this.di;
        const JST_EXPIRE = 3;
        const REMEMBER_ME_EXPIRE = 30;

        // tslint:disable-next-line: no-shadowed-variable
        return passport.authenticate('local-login', (err, identity: IIdentity) => {
            console.log('login controller passport', identity);
            if (err) {
                return res.answer(null, err, statusCode.BAD_REQUEST);
            }

            // let expire = JST_EXPIRE;
            // if (req.body.rememberMe) {
            //     expire = REMEMBER_ME_EXPIRE;
            // }
            res.cookie('token', identity.token, { maxAge: 1000606024 });
            return res.answer(identity);
        })(req, res, next);
    }

    @POST()
    @route('/')
    public jwt(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate('jwt', (err, identity: IIdentity) => {
            const isLogged = identity && identity.id ;
            req.identity = identity;
            if (!isLogged) {
                req.session.identity = identity;
            }

            const isAllow = undefined
            if (!isAllow) {
                return res.answer(null, statusCode['404_MESSAGE'], statusCode.NOT_FOUND)
            }
        })
    }
}