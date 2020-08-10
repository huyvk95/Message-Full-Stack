import common from "../common";
import { IMessageData, IPayloadData } from "../interface/DataInterface";

export function receiveMessage(message: IMessageData) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.MESSAGE_RECEIVE,
            payload: message
        })
    }
}

export function getMessages({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        // Check data
        if (!success) {
            console.log(message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.MESSAGE_GET,
                payload: data
            })
        }
    }
}