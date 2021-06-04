import * as awilix from 'awilix';
import config from '../config';

import services, { IServicesContainer } from './services';
import models, { IModelContainer } from './models';
import passport, { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import SignUpStrategy from './passports/SignUpStrategy';
import { asClass } from 'awilix';
import strategies, {IStrategyContainer} from './passports/index'


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});
export interface IContextContainer extends IStrategyContainer, IModelContainer, IServicesContainer {
    config: any;
    passport: PassportStatic;
}

const passportFunc = (ctx: IContextContainer)  => {
    // passport.use('local-login', passportLocal.loginStrategy.strategy);
    passport.use('local-signup', ctx.SignUpStrategy.strategy);
    //passport.use(passportLocal.jwtStrategy.strategy);
    return passport;
};

container.register({
    config: awilix.asValue(config),
    passport: awilix.asFunction(passportFunc).singleton(),
    ...strategies,
    ...models,
    ...services,
})

export default container;