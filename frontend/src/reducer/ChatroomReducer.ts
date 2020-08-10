import common from "../common";
import { IChatroomReducerData } from "../interface/DataInterface";

let initializeState: IChatroomReducerData[] = []

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.CHATROOM_CREATE) {
        return [payload, ...state]
    } else if (type === common.action.CHATROOM_UPDATE) {
        let nstate = [...state]
        let data: IChatroomReducerData = payload;
        let index = state.findIndex(o => o.chatroom._id === data.chatroom._id)
        if (typeof index === 'number' && index !== -1) {
            nstate.splice(index, 1, data)
            return nstate.sort((a, b) => new Date(b.chatroom.updateTime).getTime() - new Date(a.chatroom.updateTime).getTime());
        }
    } else if (type === common.action.CHATROOM_UNFOLLOW) {
        let nstate = [...state]
        let data: IChatroomReducerData = payload;
        let index = state.findIndex(o => o.chatroom._id === data.chatroom._id)
        if (typeof index === 'number' && index !== -1) {
            nstate.splice(index, 1)
            return nstate;
        } else if (data) {
            return [data, ...nstate]
        }
    } else if (type === common.action.CHATROOM_INVITE) {

    } else if (type === common.action.CHATROOM_GETALLUSERCHATROOMS) {
        return payload
    }
    return state;
}