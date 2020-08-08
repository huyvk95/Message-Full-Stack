import common from "../common";
import { IFriendRequest } from "../interface/DataInterface";
import _ from "underscore";

let initializeState: {
    receive: IFriendRequest[],
    sent: IFriendRequest[]
} = {
    receive: [],
    sent: []
}

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.FRIENDREQUEST_GET) {
        return _.isEqual(_.allKeys(payload), ["receive", "sent"]) ? payload : state;
    } else if (type === common.action.FRIENDREQUEST_PUSH_RECEVICE) {
        if (payload) return Object.assign({}, state, { receive: [...state.receive, payload] })
    } else if (type === common.action.FRIENDREQUEST_PUSH_SENT) {
        if (payload) return Object.assign({}, state, { sent: [...state.sent, payload] })
    } else if (type === common.action.FRIENDREQUEST_POP_RECEVICE) {
        if (payload) {
            let nstate = Object.assign({}, state);
            let index = nstate.receive.findIndex(o => o._id === (payload as IFriendRequest)._id)
            if (_.isNumber(index)) {
                nstate.receive.splice(index, 1)
                return nstate
            }
        }
    } else if (type === common.action.FRIENDREQUEST_POP_SENT) {
        if (payload) {
            let nstate = Object.assign({}, state);
            let index = nstate.sent.findIndex(o => o._id === (payload as IFriendRequest)._id)
            if (_.isNumber(index)) {
                nstate.sent.splice(index, 1)
                return nstate
            }
        }
    }
    return state
}