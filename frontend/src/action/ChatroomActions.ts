import common from "../common";
import { IPayloadData, IChatroomReducerData } from "../interface/DataInterface";
import { setChatroomNavigation } from "./NavigationActions";
import { setUnreadChatroom } from "./AppActions";

export function createChatroom({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        if (!success) {
            console.log(message)
        } else if (data && (data as IChatroomReducerData).chatroom) {
            let chatroomData: IChatroomReducerData = data;
            // Set chat room
            dispatch(setChatroomNavigation(chatroomData.chatroom._id))
            // Create
            dispatch({
                type: common.action.CHATROOM_CREATE,
                payload: data
            })
        }
    }
}

export function updateChatroom(data: IChatroomReducerData) {
    return async function (dispatch: Function) {
        dispatch(setUnreadChatroom(!data.myChatroom.read))

        dispatch({
            type: common.action.CHATROOM_UPDATE,
            payload: data
        })
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
            // Dispatch
            dispatch({
                type: common.action.CHATROOM_GETALLUSERCHATROOMS,
                payload: data
            })
        }
    }
}