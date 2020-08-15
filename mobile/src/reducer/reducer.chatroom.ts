import common from "../common";
import { IChatroomReducerData } from "../interface/interface.data";

let initializeState: IChatroomReducerData[] = []

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.CHATROOM_CREATE) {
        let data: IChatroomReducerData = payload;
        if (state.every(o => o.chatroom._id !== data.chatroom._id))
            return [payload, ...state]
    } else if (type === common.action.CHATROOM_UPDATE) {
        let nstate = [...state]
        let data: IChatroomReducerData = payload;
        let index = state.findIndex(o => o.chatroom._id === data.chatroom._id)
        if (typeof index === 'number' && index !== -1) {
            nstate.splice(index, 1, data)
            return nstate.sort((a, b) => new Date(b.chatroom.updateTime).getTime() - new Date(a.chatroom.updateTime).getTime());
        } else {
            return [payload, ...nstate]
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
        let nstate: IChatroomReducerData[] = [...payload, ...state];
        let chatroomIds = Array.from(new Set(nstate.map(o => o.chatroom._id)));
        let chatroomData = chatroomIds.map(chatroomId => nstate.find(oo => oo.chatroom._id === chatroomId))
            .sort((a, b) => new Date((b?.chatroom?.updateTime) as string).getTime() - new Date((a?.chatroom?.updateTime) as string).getTime())
        return chatroomData
    }
    return state;
}