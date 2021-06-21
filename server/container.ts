import * as awilix from 'awilix';
import config from '../config';

import services, { IServicesContainer } from './services';
import models, { IModelContainer } from './models';
import passport, { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import SignUpStrategy from './passports/SignUpStrategy';
import { asClass } from 'awilix';
import SignInStrategy from './passports/SignInStrategy';
import JwtStrategy from './passports/JwtStrategy';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});
export interface IContextContainer extends IModelContainer, IServicesContainer {
    config: any;
    passport: PassportStatic;
    SignUpStrategy: SignUpStrategy;
    SignInStrategy: SignInStrategy;
    JwtStrategy: JwtStrategy;
}

const passportFunc = (ctx: IContextContainer)  => {
    passport.use('local-login', ctx.SignInStrategy.strategy);
    passport.use('local-signup', ctx.SignUpStrategy.strategy);
    passport.use('jwt', ctx.JwtStrategy.strategy);

    return passport;
};

container.register({
    config: awilix.asValue(config),
    passport: awilix.asFunction(passportFunc).singleton(),
    SignUpStrategy: awilix.asClass(SignUpStrategy).singleton(),
    SignInStrategy: awilix.asClass(SignInStrategy).singleton(),
    JwtStrategy: awilix.asClass(JwtStrategy).singleton(),
    ...models,
    ...services,
})

export default container;