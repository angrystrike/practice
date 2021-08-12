import { call } from 'redux-saga/effects'
import action from 'redux/decorators/action';
import { ENTITIES } from 'server/common';
import Entity from './Entity';


export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    image: string;
}

export class UserEntity extends Entity {
    constructor() {
        super(ENTITIES.USERS, {});
    }

    @action()
    public * register(data) {
        yield call(this.xSave, 'auth/register', data);
    }

    @action()
    public * login(data) {
        yield call(this.xSave, 'auth/login', data);
    }

    public test() {
        console.log('TEST');
    }
}

const userEntity = new UserEntity();
export default userEntity;