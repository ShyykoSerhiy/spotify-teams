import { ThunkDispatch } from 'redux-thunk';
import { Api, getApi } from '../../spotify/api';
import { Device, User } from '../state';
export const SET_AUTH_INFO = 'SET_AUTH_INFO' as 'SET_AUTH_INFO';
export const LOAD_USER = 'LOAD_USER' as 'LOAD_USER';
export const LOAD_DEVICES = 'LOAD_DEVICES' as 'LOAD_DEVICES';
export const SELECT_DEVICE = 'SELECT_DEVICE' as 'SELECT_DEVICE';

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

export interface ILoadDevicesAction {
    type: typeof LOAD_DEVICES
    devices: Device[]
}

export interface ISelectDeviceAction {
    type: typeof SELECT_DEVICE
    device: Device
}

export type Action = ISetAuthInfoAction | ILoadUserAction | ILoadDevicesAction | ISelectDeviceAction;

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

export function loadDevices() {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        if (!api) {
            return;
        }
        const devices = (await api.player.devices.get()).devices;
        dispatch({
            type: LOAD_DEVICES,
            devices
        } as ILoadDevicesAction);
    };
}

export function selectDevice(device: Device): ISelectDeviceAction {
    return {
        type: SELECT_DEVICE,
        device
    }
}

const actionCreators = {
    loadUser,
    setAuthInfo,
    loadDevices,
    selectDevice
};

export type ActionCreators = typeof actionCreators;

export default actionCreators;