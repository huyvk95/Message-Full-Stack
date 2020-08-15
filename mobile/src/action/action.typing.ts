import common from "../common";

export function setTyping(payload: any) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.TYPING,
            payload: payload
        })
    }
}
