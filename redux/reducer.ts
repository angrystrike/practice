import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";

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
            return {...state, ...action.payload, isHydrate: true };
            // if (action.payload.app === 'init') delete action.payload.app;
            // if (action.payload.page === 'init') delete action.payload.page;
            // if (!state.isHydrate) {
            //     return { ...state };
            // }
            // return { ...state, ...action.payload, isHydrate: true };
        case 'APP':
            return { ...state, app: action.payload };
        case 'PAGE':
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

function products(state = [], action: any) {
    return state;
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