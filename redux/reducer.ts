import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { fromJS, Map } from 'immutable';
import { REQUEST_RESULT } from "./models/Entity";
import { CLEAR_SSR_DATA, SET_SSR_DATA } from "./action";



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
            console.log('CLEAR SSR ');
            state[action.name] = undefined;
            return { ...state };
        }
        break;
    }
    default:
        return state;
    }
};

const initialEntities = fromJS({});

function entities(state = initialEntities, action: any) {
    switch(action.type) {
        case REQUEST_RESULT:
            const { data } = action;
            
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
    ssrReducer
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}


export default rootReducer;
