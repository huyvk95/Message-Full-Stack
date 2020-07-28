import common from "../common";
import * as api from "../Api"

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

export function logout() {
    return async function (dispatch: Function) {
        // Get data
        let data = await api.logout()
        // Check data
        if (!data.success) {
            console.log(data.message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.LOGOUT,
            })
        }
    }
}