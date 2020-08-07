import common from "../common";
import { IAppData } from "../interface/DataInterface";

let initializeState: IAppData = {
    lang: 'en',
    deviceId: '',
    toast: undefined,
    popup: {}
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.INITIALIZE:
            return Object.assign({}, state, action.payload);
        case common.action.PUSH_TOAST:
            return Object.assign({}, state, { toast: action.payload });
        case common.action.CLOSE_POPUP:
            return Object.assign({}, state, { popup: Object.assign({}, state.popup, { show: false }) });
        case common.action.OPEN_POPUP:
            return Object.assign({}, state, { popup: Object.assign(action.payload, { show: true }) });
        default:
            return state;
    }
}