import { call } from 'redux-saga/effects'
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

    public * register(data) {
        yield call(this.xSave, 'auth/register', data);
    }

    public * login(data) {
        yield call(this.xSave, 'auth/login', data);
    }
}

const userEntity = new UserEntity();
export default userEntity;