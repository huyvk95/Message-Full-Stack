import common from "../common";
import { IFriendData } from "../interface/DataInterface";

let initializeState: IFriendData[] = []

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.FRIEND_GET:
            return action.payload.length ? action.payload : [];
        default:
            return state;
    }
}