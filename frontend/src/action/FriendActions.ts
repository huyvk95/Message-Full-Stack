import common from "../common";
import { IPayloadData, IFriendData } from "../interface/DataInterface";

export function getFriend({ success, data, message }: IPayloadData) {
    return async function (dispatch: Function) {
        // Check data
        if (!success) {
            console.log(message)
        } else {
            // Dispatch action
            dispatch({
                type: common.action.FRIEND_GET,
                payload: data
            })
        }
    }
}

export function updateFriendData(data: IFriendData) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.FRIEND_UPDATE_DATA,
            payload: data
        })
    }
}