import * as awilix from 'awilix';
import config from '../config';

import services, { IServicesContainer } from './services';
import models, { IModelContainer } from './models';


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

export interface IContextContainer extends IModelContainer, IServicesContainer {
    config: any;
}

container.register({
    config: awilix.asValue(config),
    ...models,
    ...services,
})

export default container;