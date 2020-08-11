import common from "../common";
import { IAppData } from "../interface/DataInterface";
import { EViewType } from "../common/TypeCommon";

let initializeState: IAppData = {
    lang: 'en',
    deviceId: '',
    viewType: EViewType.WINDOW,
    notification: true,
    sound: true,
    toast: undefined,
    popup: {}
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.INITIALIZE:
            return Object.assign({}, state, action.payload);
        case common.action.SET_VIEW_TYPE:
            return Object.assign({}, state, { viewType: action.payload });
        case common.action.PUSH_TOAST:
            return Object.assign({}, state, { toast: action.payload });
        case common.action.TOGGLE_SOUND:
            return Object.assign({}, state, { sound: action.payload });
        case common.action.TOGGLE_NOTIFICATION:
            return Object.assign({}, state, { notification: action.payload });
        case common.action.CLOSE_POPUP:
            return Object.assign({}, state, {
                popup: action.payload && state.popupBackup ? Object.assign({}, state.popupBackup) : Object.assign({}, state.popup, { show: false })
            });
        case common.action.OPEN_POPUP:
            return Object.assign({}, state, {
                popup: Object.assign(action.payload, { show: true }),
                popupBackup: Object.assign({}, state.popup, { show: true })
            });
        case common.action.CLOSE_DIALOG:
            return Object.assign({}, state, { dropdown: undefined })
        case common.action.OPEN_DIALOG:
            return Object.assign({}, state, { dropdown: action.payload })
        default:
            return state;
    }
}