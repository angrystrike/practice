import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { get, fromJS, List, Map } from 'immutable';
import { REQUEST_RESULT } from "./models/Entity";
import { isEmpty } from "server/common";


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
                console.log('data entities', data.entities);
                console.log('state', state);

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
    
    // switch(action.type) {
    //     case 'REQUEST_FEATURED_PRODUCTS': {
    //         console.log('action',action);
            
    //      //   const data = JSON.parse(JSON.stringify(action.entities));
    //        /// return data;
    //         // state = fromJS(state);
    //         // console.log('data', action.data);
            
    //         // state = state.mergeDeep(fromJS(action.data));
    //         // console.log('state',state);
            
    //         // return state;
    //     }
        // case 'REQUEST_PRODUCT': {
        //     const data = JSON.parse(JSON.stringify(action.data));
        //     return [data];
        //     // return {
        //     //     products: [
        //     //         ...state.products,
        //     //         data
        //     //     ]
        //     // }
        //     // return {
        //     //     ...state,
        //     //     products: [
        //     //         ...state.products,
        //     //         data
        //     //     ] 
        //     // }
        //     // return {
        //     //     state,
        //     //     data: [ data ]
        //     // };
        // }
        // case 'REQUEST_SIMILAR_PRODUCTS': {
        //     const data = JSON.parse(JSON.stringify(action.data));
        //     return data;
        //     // console.log('data',data)
        //     // return {
        //     //     ...state,
        //     //     products: [
        //     //         ...state.products,
        //     //         data
        //     //     ]
        //     // }
        // }
    //     default:
    //         return state;
    // }
}

const appReducer = combineReducers({
    entities,
    isHydrate
});

// function rootReducer(state, action) {
//     const intermediateState = appReducer(state, action);
//     const finalState = nextReducer(intermediateState, action);
//     return finalState;
// }

export default appReducer;
