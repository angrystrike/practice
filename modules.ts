import nextConfig from 'next.config'

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

function xFetch(endpoint: string, method: HTTP_METHOD, data = {}, token?: string) {
    let fullUrl = nextConfig.public.BASE_URL + '/' + endpoint;

    const params: any = {
        method,
        credentials: 'include',
        headers: {
            Authorization: 'bearer ' + token, // get token from cookies
        },
    };

    if (method !== HTTP_METHOD.GET) {
        params['headers']['content-type'] = 'application/json';
        params['body'] = JSON.stringify(data);

    } else {
        const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
        fullUrl += (opts.length > 0 ? '?' + opts : '');
    }

    return fetch(fullUrl, params)
        .then((response) => {
            return response.json().then((json) => ({ json, response }));
        })
        .then(({ json, response }) =>
                Promise.resolve({
                    success: response.ok ? true : false,
                    response: json
                })
            );
}

export function xSave(uri: string, data: any = {}) {
    return xFetch(uri, HTTP_METHOD.POST, data);
}

export function xRead(uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) {
    return xFetch(uri, method, data);
}

export function xDelete(uri: string, data: any = {}) {
    return xFetch(uri, HTTP_METHOD.DELETE, data);
}
