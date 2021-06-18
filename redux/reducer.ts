import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { fromJS, Map } from 'immutable';
import { REQUEST_RESULT } from "./models/Entity";


export const HYDRATE_ACTION = 'HYDRATE_ACTION';

export interface AppState {
    entities: Map<string, Map<string, any>>,
    isHydrate: boolean;
}

function isHydrate(state = true, action: any) {
    switch (action.type) {
        case HYDRATE_ACTION:
            return action.value;
        }
    return state;
}

const nextReducer = (
    state: AppState,
    action: AnyAction
) => {
    switch (action.type) {
    case HYDRATE:
        if (action.payload.app === 'init') delete action.payload.app;
        if (action.payload.page === 'init') delete action.payload.page;
        if (!state.isHydrate) {
            return { ...state };
        }
        return { ...state, ...action.payload, isHydrate: true  };
    case 'APP':
        return { ...state, app: action.payload };
    case 'PAGE':
        return { ...state, page: action.payload };
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
    isHydrate
});

export default appReducer;
