import { call, put } from "redux-saga/effects";
import { setIdentity } from "redux/action";
import action from "redux/decorators/action";
import Entity, { HTTP_METHOD } from "./Entity";


export class Identity extends Entity {
    constructor() {
        super('Identity');
    }
    // public firstName: string = 'guest';
    // public lastName: string = 'guest';
    // public role: ROLE = ROLE.GUEST;

    @action()
    public * loginUser(data: any) {
        console.log('loginUser data', data);
        // const { response } = yield call(Entity.fetch, '/auth/login', data, HTTP_METHOD.POST);
        const { response } = yield call(this.xFetch, 'auth/login', HTTP_METHOD.POST, data);
        console.log('loginUser resp', response.data);
        
        yield put(setIdentity(response.data));

        // // 
        // if (response && response.user && response.user.userId && response.user.token && response.user.token.length > 0) {
        // }
    }

    @action()
    public * register(data: any) {
        // yield call(this.xSave, 'auth/register', data);
        const { response } = yield call(this.xFetch, 'auth/register', HTTP_METHOD.POST, data);
    }
}

const identity = new Identity();
export default identity;