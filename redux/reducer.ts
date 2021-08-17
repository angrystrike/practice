import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { fromJS, Map } from 'immutable';
import { REQUEST_RESULT } from "./models/Entity";
import { CLEAR_SSR_DATA, GET_IDENTITY, SET_IDENTITY, SET_SSR_DATA } from "./action";
import { ROLE } from "server/common";



export interface AppState {
    entities: Map<string, Map<string, any>>,
}

const nextReducer = (
    state: AppState,
    action: AnyAction
) => {
    switch (action.type) {
        case HYDRATE:
            if (action.payload.entities.size <= 0) {
                return { ...state };
            }
            return { ...state, ...action.payload };
        case 'APP':
            return { ...state, app: action.payload };
        case 'PAGE':
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

const queryInitialState: any = null;
const ssrReducer = (state = queryInitialState, action: any) => {
    switch (action.type) {
        case SET_SSR_DATA: {
            return { ...action.data };
        }
        case CLEAR_SSR_DATA: {
            if (state && (action.name in state)) {
                state[action.name] = undefined;
                return { ...state };
            }
            break;
        }
        default:
            return state;
    }
};

const initialIdentity = {
    firstName: 'guest123',
    lastName: 'guest',
    role: ROLE.GUEST,
};

const identity = (state = initialIdentity, action: any) => {
    console.log('identity reducer');

    switch (action.type) {
        case GET_IDENTITY: {
            console.log('reducer identity', action);

            if (action.user) {
                return { ...state, user: { ...action.user } };
            }
            break;
        }
        case SET_IDENTITY: {
            console.log('SET action', action);
            console.log('SET user', action.user);
            delete(action.type);
            if (action) {
                return { ...state, ...action };
            }
            break;
        }
        default:
            return state;
    }
}



const initialEntities = fromJS({});

function entities(state = initialEntities, action: any) {
    switch (action.type) {
        case REQUEST_RESULT:
            const { data } = action;
            console.log('request data', action);

            if (data.entities) {
                Object.keys(data.entities).map((entityName) => {
                    let list = state.get(entityName);
                    if (list && list.size > 0) {
                        Object.keys(data.entities[entityName]).map((id) => list = list.remove(id));
                    }
                    state = state.set(entityName, list);
                });
                state = state.mergeDeep(fromJS(data.entities));
            }
            break;
    }
    return state;
}

const appReducer = combineReducers({
    entities,
    ssrReducer,
    identity
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}


export default rootReducer;
