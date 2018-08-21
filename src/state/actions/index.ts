import { ThunkDispatch } from 'redux-thunk';
import { Api, getApi } from '../../spotify/api';
import { User } from '../state';
export const SET_AUTH_INFO = 'SET_AUTH_INFO' as 'SET_AUTH_INFO';
export const LOAD_USER = 'LOAD_USER' as 'LOAD_USER';

let api: Api | null = null;
export const provideApi = (token: string, refreshToken: string) => {
    api = getApi(token, refreshToken);
}

export interface ISetAuthInfoAction {
    type: typeof SET_AUTH_INFO
    token: string,
    refreshToken: string
}

export interface ILoadUserAction {
    type: typeof LOAD_USER
    user: User
}

export type Action = ISetAuthInfoAction | ILoadUserAction;

export function setAuthInfo(token: string, refreshToken: string): ISetAuthInfoAction {
    return {
        refreshToken, token, type: SET_AUTH_INFO
    }
}

export function loadUser() {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        if (!api) {
            return;
        }
        const user = await api.me.get();
        dispatch({
            type: LOAD_USER,
            user
        } as ILoadUserAction);
    };
}

const actionCreators = {
    loadUser,
    setAuthInfo
};

export type ActionCreators = typeof actionCreators;

export default actionCreators;