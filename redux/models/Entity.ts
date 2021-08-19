import nextConfig from 'next.config'
import { normalize, schema } from 'normalizr';
import { fork, call, put, take, ForkEffect, TakeEffect, select } from 'redux-saga/effects';
import { action, clearSSRData, getIdentity } from 'redux/action';
import { camelizeKeys } from 'humps';
import { ISagaAction, isEmpty, SagaAction } from 'server/common';


export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

export const REQUEST_RESULT = 'REQUEST_RESULT';
export const requestResult = (entityName: string, data: any) => action(REQUEST_RESULT, { entityName, data });

export default class Entity {
    private schema;
    private entityName;
    public static actions : ISagaAction = {};

    constructor(name: string, options: any = {}) {
        this.schema = new schema.Entity(name, options);
        
        this.entityName = name;
        this.xRead = this.xRead.bind(this);
        this.xSave = this.xSave.bind(this);
        this.xFetch = this.xFetch.bind(this);
        this.actionRequest = this.actionRequest.bind(this);
    }

    public static getSagaList() {
        const list = [];
        Object
            .keys(Entity.actions)
            .map(entity => 
                Object.keys(Entity.actions[entity])
                .filter(method => typeof Entity.actions[entity][method].saga == 'function')
                .map(method => 
                    list.push(Entity.actions[entity][method].saga())
                    
                )
            )
        return list;
    }

    public triggers() {
        const list = {};
        const entityName = this.constructor.name;
        if (entityName in Entity.actions) {
            const methods = Entity.actions[entityName];
            Object.keys(methods).map(method => {
                list[method] =Entity.actions[entityName][method].trigger;
            })
        }
        return list;
    }

    protected xFetch(endpoint: string, method: HTTP_METHOD, data = {}, token?: string) {
        let fullUrl = nextConfig.public.BASE_URL + '/' + endpoint;

        const params: any = {
            method,
            credentials: 'include',
            headers: {
                Authorization: 'bearer ' + token,
            },
        };

        const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        fullUrl += (opts.length > 0 ? '?' + opts : '');

        if (method != HTTP_METHOD.GET) {
            params['headers']['content-type'] = 'application/json';
            params['body'] = JSON.stringify(data);
        } else {
            const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
            fullUrl += (opts.length > 0 ? '?' + opts : '');
        }
        console.log(method ,fullUrl);
        return fetch(fullUrl, params)
            .then((response) => {
                return response.json().then((json) => ({ json, response }));
            }).then(({ json, response }) =>
                Promise.resolve({
                    success: response.ok ? true : false,
                    response: json
                })
            );
    }

    public * actionRequest(endpoint: string, method: HTTP_METHOD, data: any) {
        console.log('actioRequest', data);
        
        let query = yield select((state: any) => state.ssrReducer && state.ssrReducer[this.entityName]);
        console.log('query', query);
        

        if (query && !isEmpty(query)) {
            yield put(clearSSRData({ name: this.entityName }));
        } 
        
        const isServer = typeof window === 'undefined';
        if (!isServer) {
            const token = yield select((state: any) => state?.identity?.token);
            const { response } = yield call(this.xFetch, endpoint, method, data, token);
            
            query = response.data;


        }
        
        if (query) {
            
            //if(query.token) {
            //     yield put(getIdentity(query))
            //     return {...query}
            // }
            // else {
                const schema = (Array.isArray(query) ? [this.schema] : this.schema);
                const normalizedData = normalize(camelizeKeys(JSON.parse(JSON.stringify(query))), schema);
                yield put(requestResult(this.entityName, normalizedData));
                console.log('normalizedData', normalizedData);
            
                return { ...query };
            //}
            
        }
        return null;
    }

    public xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) {
        return this.actionRequest(uri, method, data);
    }

    public xSave(uri: string, data: any = {}) {
        return this.actionRequest(uri, HTTP_METHOD.POST, data);
    }
}