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
        this.xSave = this.xSave.bind(this);
        this.xFetch = this.xFetch.bind(this);
        this.actionRequest = this.actionRequest.bind(this);
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
        // let fullUrl = nextConfig.public.BASE_URL + '/products/60b75fab5fe771649be87bb3';

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

        // if (method !== HTTP_METHOD.GET) {
        //     params['headers']['content-type'] = 'application/json';
        //     params['body'] = JSON.stringify(data);

        // } else {
        //     const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        //     fullUrl += (opts.length > 0 ? '?' + opts : '');
        // }

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
        console.log('all info', endpoint, method, data);
        
        const { response } = yield call(this.xFetch, endpoint, method, data, token);
        console.log('response', response.data);
        console.log('schema', this.schema);
        console.log('BEFORE NORMALIZE');
        
        const normalizedData = normalize(response.data, Array.isArray(response.data) ? [this.schema] : this.schema);
        console.log('AFTER NORMALIZE');
        // const normalizedData = normalize(response.data, this.schema);
        console.log('normalized', normalizedData);
        
        yield put(requestResult(this.entityName, normalizedData));  
        return { ...response };
    }

    public xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET ) {
        console.log('URI', uri);
        return this.actionRequest(uri, method, data);
    }

    public xSave(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.POST) {
        return this.actionRequest(uri, method, data);
    }
}