import { call, put } from "redux-saga/effects";
import { clearIdentity, setIdentity } from "redux/action";
import action from "redux/decorators/action";
import Entity, { HTTP_METHOD } from "./Entity";


export class Identity extends Entity {
    constructor() {
        super('Identity');
    }

    @action()
    public * loginUser(data: any) {
        const { response } = yield call(this.xFetch, 'auth/login', HTTP_METHOD.POST, data);      
        yield put(setIdentity(response.data));
    }

    @action()
    public * register(data: any) {
        yield call(this.xFetch, 'auth/register', HTTP_METHOD.POST, data);
    }

    @action()
    public * logout() {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        yield put(clearIdentity());
    }
}

const identity = new Identity();
export default identity;