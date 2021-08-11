import nextConfig from 'next.config'
import { normalize, schema } from 'normalizr';
import { call, put } from 'redux-saga/effects';
import { action } from 'redux/action';
import { camelizeKeys } from 'humps';
import { constants } from 'buffer';
import { Action } from 'swr/dist/types';
import { SagaAction } from 'server/common';


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
    private static watchers: Function[] = [];
    private static constants: Array<String> = [];
    private static actions: Array<SagaAction> = [];

    constructor(name: string, options: any = {}) {
        this.schema = new schema.Entity(name, options);

        console.log('CURRENT CLASS', this.constructor.name);

        const instanceOnly = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(prop => prop != "constructor");
        
        console.log(instanceOnly);
            
        instanceOnly.forEach((functionName, i) => { 
            this[functionName] = this[functionName].bind(this);
            Entity.addWatcher([this[functionName]]);

          // let actionName = (data: any) => action(functionName.toUpperCase(), data);

            // type GreetFunction = (a: string) => void;
            // = (data: any) => action(FETCH_FEATURED_PRODUCTS, data);
            Entity.actions.push({ 
                saga: this[functionName],
                trigger: (data: any) => action(functionName.toUpperCase(), data)
            });
            
            console.log('actions', Entity.actions);
        });



        this.entityName = name;
        this.xRead = this.xRead.bind(this);
        this.xSave = this.xSave.bind(this);
        this.xFetch = this.xFetch.bind(this);
        this.xSave = this.xSave.bind(this);
    }

    public static getActions() {
        return this.actions;
    }

    public static getWatchers() {
        return this.watchers;
    }


    public static setWatchers(watchers: Array<Function>) {
        this.watchers = watchers;
    }

    public static addWatcher(watchers: Array<Function>) {
        Entity.setWatchers(Entity.getWatchers().concat(watchers));
    }

    // public static addConstant(array : Array<String>) {
    //     array.forEach((functionName, i) => { 
    //         Entity.constants.push(functionName.toUpperCase())
    //     });
    // }

    protected xFetch(endpoint: string, method: HTTP_METHOD, data = {}, token?: string) {
        console.log('endpoint', endpoint);

        let fullUrl = nextConfig.public.BASE_URL + '/' + endpoint;
        console.log('fullUrl', fullUrl);

        const params: any = {
            method,
            credentials: 'include',
            headers: {
                Authorization: 'bearer ' + token,
            },
        };
        console.log('ENDPOINT', endpoint);
        console.log('FULL URL', fullUrl);

        const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        fullUrl += (opts.length > 0 ? '?' + opts : '');

        if (method != HTTP_METHOD.GET) {
            params['headers']['content-type'] = 'application/json';
            params['body'] = JSON.stringify(data);
        } else {
            const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
            fullUrl += (opts.length > 0 ? '?' + opts : '');
        }

        console.log('Entity xfetch', data);
        console.log('METGHOD', method);


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

    protected * actionRequest(endpoint: string, method: HTTP_METHOD, data: any, token?: string) {
        console.log('all info', endpoint, method, data);

        const { response } = yield call(this.xFetch, endpoint, method, data, token);
        const schema = (Array.isArray(response.data) ? [this.schema] : this.schema);
        console.log('response.data', response.data);

        // const normalizedData = normalize(response.data, schema);
        const normalizedData = normalize(camelizeKeys(response.data), schema);
        console.log('normalizedData', normalizedData);


        yield put(requestResult(this.entityName, normalizedData));
        return { ...response };
    }

    public xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) {
        console.log('URI', uri);
        return this.actionRequest(uri, method, data);
    }

    public xSave(uri: string, data: any = {}) {
        return this.actionRequest(uri, HTTP_METHOD.POST, data);
    }
}