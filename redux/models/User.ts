import { put, take, call } from 'redux-saga/effects'
import { xRead } from '../../modules';
import { action } from "redux/action";

export default interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    image: string;
}

export const FETCH_USER = 'FETCH_USER';
export const REQUEST_USER = 'REQUEST_USER';

export const fetchUser = (data: any) => action(FETCH_USER, data);
export const requestUser = (data: any) => action(REQUEST_USER, data);

// export function* watchRegisterUser() {
//     while (true) {
//         const data = yield take(FETCH_USER);
//         const data = yield call(xRead, {
//             user_id: data.id
//         });
//         put(requestUser(data));
//     }
// }
