import common from "../common";
import { IUserChatroomData } from "../interface/DataInterface";

let initializeState: IUserChatroomData[] = []

export default function (state = initializeState, { type, payload }: { type: string, payload: any }) {
    if (type === common.action.CHATROOM_CREATE) {

    } else if (type === common.action.CHATROOM_UNFOLLOW) {

    } else if (type === common.action.CHATROOM_INVITE) {

    } else if (type === common.action.CHATROOM_GETALLUSERCHATROOMS) {
        return payload
    }
    return state;
}