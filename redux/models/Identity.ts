import { call, put } from "redux-saga/effects";
import { clearIdentity, setIdentity } from "redux/action";
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
        const { response } = yield call(this.xFetch, 'auth/login', HTTP_METHOD.POST, data);
        
        yield put(setIdentity(response.data));

        // // 
        // if (response && response.user && response.user.userId && response.user.token && response.user.token.length > 0) {
        // }
    }

    @action()
    public * register(data: any) {
        yield call(this.xFetch, 'auth/register', HTTP_METHOD.POST, data);
    }

    @action()
    public * logout() {
        yield put(clearIdentity());
    }
}

const identity = new Identity();
export default identity;