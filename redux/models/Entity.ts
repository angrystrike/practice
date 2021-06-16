import nextConfig from 'next.config'
import { normalize, schema } from 'normalizr';
import { put } from 'redux-saga/effects';
import { requestFeaturedProducts } from 'redux/models/Product';

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

export default class Entity {
    private schema;
    private static watchers: Function[] = [];

    constructor(schema) {
        this.schema = schema;
        this.xRead = this.xRead.bind(this);
        this.xFetch = this.xFetch.bind(this);
    }

    public static getWatchers() {
        return this.watchers;
    }
    
    protected * xFetch(endpoint: string, method: HTTP_METHOD,func : Function, data = {}, token?: string) {
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

        let normalizedData;
        console.log('Entity xfetch', data);
        
        yield fetch(fullUrl, params)
            .then((response) => {
                return response.json().then((json) => ({ json, response }));
            })

            .then(({ json, response }) => {
                console.log('fetch', json);
                
                normalizedData = normalize(json.data, [this.schema]);
                console.log('Normalized: ', normalizedData);                
            });

        yield put(func(normalizedData));   
    }

    public * xRead(uri: string, data: any = {},func : Function, method: HTTP_METHOD = HTTP_METHOD.GET ) {
        console.log('xRed');
        
        yield this.xFetch(uri, method, func, data);
    }
}





// export function xSave(uri: string, data: any = {}) {
//     return xFetch(uri, HTTP_METHOD.POST, data);
// }

// export function* xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) {
//     return xFetch(uri, method, data);
// }

// export function xDelete(uri: string, data: any = {}) {
//     return xFetch(uri, HTTP_METHOD.DELETE, data);
// }
