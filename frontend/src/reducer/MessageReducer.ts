import common from "../common";
import { IMessageData } from "../interface/DataInterface";

let initializeState: { [key in string]: IMessageData[] } = {}

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.MESSAGE_RECEIVE) {
        let nstate = Object.assign({}, state);
        let data: IMessageData = payload
        // Create chatroom if chatroom undefined
        nstate[data.chatroom] = nstate[data.chatroom] || []
        // Push message
        nstate[data.chatroom].push(data);
        return nstate
    } else if (type === common.action.MESSAGE_GET) {
        let nstate = Object.assign({}, state);
        let { chatroomId, messages }: { chatroomId: string, messages: IMessageData[] } = payload;
        // Create chatroom if chatroom undefined
        nstate[chatroomId] = nstate[chatroomId] || []
        // Set messages
        nstate[chatroomId] = messages.concat(nstate[chatroomId]);
        // Set message
        nstate[chatroomId] = nstate[chatroomId]
            .filter((o, i) => nstate[chatroomId].findIndex(oo => oo._id === o._id) === i)
            .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())
        return nstate;
    }
    return state;
}