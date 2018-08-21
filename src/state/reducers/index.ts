import { Action, LOAD_DEVICES, LOAD_USER, SELECT_DEVICE, SET_AUTH_INFO } from '../actions';
import { IStoreState } from '../state';

export function reducer(state: IStoreState, action: Action): IStoreState {
    switch (action.type) {
        case SET_AUTH_INFO:
            return { ...state, token: action.token, refreshToken: action.refreshToken };
        case LOAD_USER:
            return { ...state, user: action.user };
        case LOAD_DEVICES:
            const { devices } = action;
            const selectedDevice = devices.find((d) => {
                return d.is_active;
            }) || devices[0];
            return { ...state, devices, selectedDevice }
        case SELECT_DEVICE:
            return { ...state, selectedDevice: action.device }
    }
    return state;
}