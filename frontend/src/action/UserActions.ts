import axios from "axios";
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
                payload: data.data
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