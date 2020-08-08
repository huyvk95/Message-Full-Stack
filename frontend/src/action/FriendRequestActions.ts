import common from "../common";
import { IPayloadData, IFriendRequest } from "../interface/DataInterface";

export function getFriendRequest({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        // Check data
        if (!success) {
            console.log(message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.FRIENDREQUEST_GET,
                payload: data
            })
        }
    }
}

export function pushReceiveRequest(data: IFriendRequest) {
    return {
        type: common.action.FRIENDREQUEST_PUSH_RECEVICE,
        payload: data
    }
}

export function pushSentRequest(data: IFriendRequest) {
    return {
        type: common.action.FRIENDREQUEST_PUSH_SENT,
        payload: data
    }
}

export function popReceiveRequest(data: IFriendRequest) {
    return {
        type: common.action.FRIENDREQUEST_POP_RECEVICE,
        payload: data
    }
}

export function popSentRequest(data: IFriendRequest) {
    return {
        type: common.action.FRIENDREQUEST_POP_SENT,
        payload: data
    }
}
