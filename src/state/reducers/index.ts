import { Action, LOAD_USER, SET_AUTH_INFO } from '../actions';
import { IStoreState } from '../state';

export function reducer(state: IStoreState, action: Action): IStoreState {
    switch (action.type) {
        case SET_AUTH_INFO:
            return { ...state, token: action.token, refreshToken: action.refreshToken };
        case LOAD_USER:
            return { ...state, user: action.user };
    }
    return state;
}