import { Action } from 'redux';

export const HYDRATE_ACTION         = 'HYDRATE_ACTION';
export const SET_SSR_DATA           = 'SET_SSR_DATA';
export const CLEAR_SSR_DATA         = 'CLEAR_SSR_DATA';

export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}

export const setHydrate = (value: boolean) => action (HYDRATE_ACTION, { value });
export const setSSRData = (data: any = null) => action(SET_SSR_DATA, data);
export const clearSSRData = (data: any = null) => action(CLEAR_SSR_DATA, data);