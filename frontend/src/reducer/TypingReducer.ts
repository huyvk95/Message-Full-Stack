import common from "../common";
import { IFriendData } from "../interface/DataInterface";

let initializeState: { [key in string]: IFriendData[] } = {}

export default function (state = initializeState, { type, payload }: { type: string, payload: { chatroomId: string, typing: boolean, user: IFriendData } }) {
    if (type === common.action.TYPING) {
        // Variable
        let { chatroomId, typing, user } = payload;
        // Clone state
        let nstate = Object.assign({}, state);
        // Add typing data if not exist
        nstate[chatroomId] = nstate[chatroomId] || []
        let typingData = nstate[chatroomId];
        // If typing is true ==> push else remove
        if (typing) {
            if (typingData.every(o => o._id !== user._id)) typingData.push(user);
        } else {
            let index = typingData.findIndex(o => o._id === user._id);
            if (index !== -1) typingData.splice(index, 1);
        }
        return nstate;
    }
    return state;
}