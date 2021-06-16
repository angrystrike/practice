import createSagaMiddleware, { Task } from 'redux-saga';
import nextConfig from 'next.config'
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { AppState } from './reducer';
import rootReducer from './reducer';
import { all } from 'redux-saga/effects'
import { ProductEntity, watchFetchFeaturedProducts, watchFetchProduct, watchFetchSimilarProducts } from './models/Product';
import { fromJS, List, Map } from 'immutable';




declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootSaga = function* root() {
    console.log('Root saga',ProductEntity.getWatchers());
    
    //yield all([ProductEntity.getWatchers().map((item) => item())]);
    yield all([
        watchFetchFeaturedProducts()
    ]);
};

export interface SagaStore extends Store {
    sagaTask?: Task;
    runSaga: () => void;
}

export const makeStore: MakeStore<AppState> = () => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (nextConfig.public.IS_DEV && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
        // other store enhancers if any
    );

    const store = createStore(rootReducer, enhancer) as SagaStore;
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // Entity.store = store;
    store.runSaga = () => sagaMiddleware.run(rootSaga);
    
    return store;
};


const wrapper = createWrapper<AppState>(makeStore);
export default wrapper;