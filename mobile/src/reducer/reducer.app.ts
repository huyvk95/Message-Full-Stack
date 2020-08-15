import common from "../common";
import { IAppData } from "../interface/interface.data";
import { EViewType } from "../common/common.type";

let initializeState: IAppData = {
    lang: 'en',
    deviceId: '',
    viewType: EViewType.WINDOW,
    unreadChatroom: false,
    notification: true,
    sound: true,
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.INITIALIZE:
            return Object.assign({}, state, action.payload);
        case common.action.SET_VIEW_TYPE:
            return Object.assign({}, state, { viewType: action.payload });
        case common.action.SET_UNREAD_STATE:
            return Object.assign({}, state, { unreadChatroom: action.payload });
        case common.action.PUSH_TOAST:
            return Object.assign({}, state, { toast: action.payload });
        case common.action.TOGGLE_SOUND:
            return Object.assign({}, state, { sound: action.payload });
        case common.action.TOGGLE_NOTIFICATION:
            return Object.assign({}, state, { notification: action.payload });
        default:
            return state;
    }
}