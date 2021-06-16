import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { fromJS, List, Map } from 'immutable';



export interface AppState {
    users: any,
    products: any,
}

const nextReducer = (
    state: AppState,
    action: AnyAction
) => {
    switch (action.type) {
        case HYDRATE:
            if (action.payload.app === 'init') delete action.payload.app;
            if (action.payload.page === 'init') delete action.payload.page;
            return {...state, ...action.payload};
        case 'APP':
            return {...state, app: action.payload};
        case 'PAGE':
            return {...state, page: action.payload};
        default:
            return state;
    }
};

//const initialEntities = fromJS({});

function products(state = [], action: any) {
    switch(action.type) {
        case 'REQUEST_FEATURED_PRODUCTS': {
            console.log('action',action);
            
            const data = JSON.parse(JSON.stringify(action.entities));
            return data;
            // state = fromJS(state);
            // console.log('data', action.data);
            
            // state = state.mergeDeep(fromJS(action.data));
            // console.log('state',state);
            
            // return state;
        }
        case 'REQUEST_PRODUCT': {
            const data = JSON.parse(JSON.stringify(action.data));
            return [data];
            // return {
            //     products: [
            //         ...state.products,
            //         data
            //     ]
            // }
            // return {
            //     ...state,
            //     products: [
            //         ...state.products,
            //         data
            //     ]
            // }
            // return {
            //     state,
            //     data: [ data ]
            // };
        }
        case 'REQUEST_SIMILAR_PRODUCTS': {
            const data = JSON.parse(JSON.stringify(action.data));
            return data;
            // console.log('data',data)
            // return {
            //     ...state,
            //     products: [
            //         ...state.products,
            //         data
            //     ]
            // }
        }
        default:
            return state;
    }
}

function users(state = [], action: any) {
    return state;
}

const appReducer = combineReducers({
    products,
    users
});

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export default rootReducer;