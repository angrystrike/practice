import nextConfig from 'next.config'
import { normalize, schema } from 'normalizr';
import { call, put } from 'redux-saga/effects';
import { action } from 'redux/action';

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

    constructor(name: string, options: any) {
        this.schema =  new schema.Entity(name, options, {
            idAttribute: '_id'
        });

        this.entityName = name;
        this.xRead = this.xRead.bind(this);
        this.xFetch = this.xFetch.bind(this);
    }

    public static getWatchers() {
        return this.watchers;
    }
    public static setWatchers(watchers : Array<Function>) {
        this.watchers = watchers;
    }

    public static addWatcher(watchers: Array<Function>) {
        Entity.setWatchers(Entity.getWatchers().concat(watchers));
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

        if (method !== HTTP_METHOD.GET) {
            params['headers']['content-type'] = 'application/json';
            params['body'] = JSON.stringify(data);

        } else {
            const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
            fullUrl += (opts.length > 0 ? '?' + opts : '');
        }

        console.log('Entity xfetch', data);
        
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

    protected * actionRequest (endpoint: string, method: HTTP_METHOD, data: any, token?: string) {
        const { response } = yield call(this.xFetch, endpoint, method, data, token);
        
        const normalizedData = normalize(response.data, Array.isArray(response.data) ? [this.schema] : this.schema);
        console.log('Normalized: ', normalizedData);   
        
        yield put(requestResult(this.entityName, normalizedData));  
        return { ...response };
    }

    public xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET ) {
        return this.actionRequest(uri, method, data);
    }

    public xSave(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST) {
        return this.actionRequest(uri, method, data);
    }
}