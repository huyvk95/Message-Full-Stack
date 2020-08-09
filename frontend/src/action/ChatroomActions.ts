import common from "../common";
import { IPayloadData } from "../interface/DataInterface";

export function createChatroom({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        if (!success) {
            console.log(message)
        } else {
            dispatch({
                type: common.action.CHATROOM_CREATE,
                payload: data
            })
        }
    }
}

export function unfollowChatroom({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        if (!success) {
            console.log(message)
        } else {
            dispatch({
                type: common.action.CHATROOM_UNFOLLOW,
                payload: data
            })
        }
    }
}

export function inviteChatroom({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        if (!success) {
            console.log(message)
        } else {
            dispatch({
                type: common.action.CHATROOM_INVITE,
                payload: data
            })
        }
    }
}

export function getAllChatrooms({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        if (!success) {
            console.log(message)
        } else {
            dispatch({
                type: common.action.CHATROOM_GETALLUSERCHATROOMS,
                payload: data
            })
        }
    }
}