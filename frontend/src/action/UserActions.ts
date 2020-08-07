import common from "../common";
import * as api from "../Api"
import socket from "../socket";

export function login(email: string, password: string) {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.login(email, password)
        // Check data
        if (!data.success) {
            console.log(data.message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.LOGIN,
                payload: data.data.user
            })
        }
    }
}

export function register(payload: { email: string, password: string, confirmPassword: string, firstName: string, lastName: string }) {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.register(payload)
        // Check data
        if (!data.success) {
            console.log(data.message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.REGISTER,
                payload: data.data.user
            })
        }
    }
}

export function token() {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.token()
        // Check data
        if (!data.success) {
            dispatch({
                type: common.action.TOKEN,
                payload: {}
            })
        } else {
            dispatch({
                type: common.action.TOKEN,
                payload: data.data.user
            })
        }
    }
}

export function cleanUserData() {
    return {
        type: common.action.CLEAN_USER_DATA,
    }
}

export function verify(uuid: string) {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.verify(uuid)
        // Check data
        if (!data.success) {
            console.log(data.message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.VERIFY
            })
        }
    }
}

export function logout() {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.logout()
        // Check data
        if (!data.success) {
            console.log(data.message)
        } else {
            // Socket disconnect
            socket.socket?.disconnect();
            // Dispatch action
            dispatch({
                type: common.action.LOGOUT,
            })
        }
    }
}