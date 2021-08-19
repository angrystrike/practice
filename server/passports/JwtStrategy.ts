import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import passportLocal from 'passport-local';
import { IContextContainer } from 'server/container';
import BaseContext from '../BaseContext';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IIdentity } from 'server/common';
import jwt from 'jsonwebtoken';
import config from '../../config';

export default class JwtStrategy extends BaseContext {
    private _strategy: Strategy;
    private request: Request;

    get strategy() {
        return this._strategy;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);
        console.log('before');
        
        this._strategy = new Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey: config.jwtSecret,
        }, this.verifyRequest);
    }

    public verifyRequest(jwtPayload: IIdentity, done: VerifiedCallback) {
        console.log('jwt: verifyRequest', jwtPayload);
        const user = this.di.UserService.findOneByID(jwtPayload.id);
        if (user) {
            return done(null, jwtPayload);
        } 
        return done('Incorrect identity');
    }

    public getJwtFromRequest(req: Request) {
        console.log('jwt: get jwt from request', req.cookies);
        this.request = req;
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        console.log('getToken', getToken(req));
        return getToken(req) || req.cookies['token'] || null;
    }
}