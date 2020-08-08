import common from "../common";
import { IFriendData } from "../interface/DataInterface";
import _ from "underscore";

let initializeState: IFriendData[] = []

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.FRIEND_GET) {
        return _.isArray(payload) ? payload : [];
    } else if (type === common.action.FRIEND_PUSH) {
        return [payload, ...state]
    } else if (type === common.action.FRIEND_POP) {
        let nstate = [...state]
        let friendIndex = nstate.findIndex(o => o._id === (payload as IFriendData)._id)
        if (_.isNumber(friendIndex)) {
            nstate.splice(friendIndex, 1)
            return nstate;
        }
    } else if (type === common.action.FRIEND_SETNICKNAME) {
        let nstate = [...state]
        let data = nstate.find(o => o._id === payload.friendId);
        if (data && _.isString(payload.nickname)) {
            data.nickname = payload.nickname;
            return nstate
        }
    } else if (type === common.action.FRIEND_UPDATE_DATA) {
        let nstate = [...state]
        let friendIndex = nstate.findIndex(o => o._id === (payload as IFriendData)._id)
        if (_.isNumber(friendIndex)) {
            nstate.splice(friendIndex, 1, payload)
            return nstate;
        }
    }
    return state
}