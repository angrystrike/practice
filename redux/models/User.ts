import { take, call } from 'redux-saga/effects'
import { action } from "redux/action";
import Entity from './Entity';

export const REGISTER = 'REGISTER';

export const register = (data : any) => action(REGISTER,data);

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    image: string;
}

export class UserEntity extends Entity {

    constructor() {
        super("users", {});

        this.watchRegister = this.watchRegister.bind(this);

        UserEntity.addWatcher([
            this.watchRegister
        ]);
    }

    public * watchRegister() {
        while (true) {
            const data = yield take(REGISTER);
            yield call(this.xSave, 'users/save/test', data);
        }
    }
}

const userEntity = new UserEntity();
export default userEntity;