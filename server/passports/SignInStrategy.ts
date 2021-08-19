import passportLocal from 'passport-local';
import { IContextContainer } from 'server/container';
import BaseContext from '../BaseContext';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IIdentity } from 'server/common';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default class SignInStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        
        const { UserModel } = this.di;
        const user = await UserModel.findOne({
            email: email,
        });

        if (!user) {
            return done('Incorrect email or password');
        }

        const match = bcrypt.compareSync(password, user.password);
        if (match) {
            const identity: IIdentity = {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                role: user.role
            };
            console.log('identity', identity);
            
            const token = jwt.sign(identity, config.jwtSecret);
            identity['token'] = token;
    
            req.session.identity = identity;
                
            return done(null, identity)
        } else {
            return done('Incorrect email or password');
        }

    }
}
