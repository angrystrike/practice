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
    private strategyUser: passportLocal.Strategy;
    private request: Request;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);

        this.strategyUser = new Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey: config.jwtSecret,
        }, this.getJwtFromRequest);
    }

    public async verifyRequest(jwtPayload: any, done: VerifiedCallback) {
        console.log('jwt: verifyRequest');
    }

    public getJwtFromRequest(req: Request) {
        console.log('jwt: get jwt from request');
        this.request = req;
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        return getToken(req) || req.cookies['token'] || null;
    }
}