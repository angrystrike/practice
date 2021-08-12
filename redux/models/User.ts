import { take, call } from 'redux-saga/effects'
import { action } from "redux/action";
import { ENTITIES } from 'server/common';
import Entity from './Entity';


export const REGISTER = 'REGISTER';

export const register = (data : any) => action(REGISTER,data);

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

    public * watchRegister(data) {
        yield call(this.xSave, 'users/save', data);
    }

}

const userEntity = new UserEntity();
export default userEntity;