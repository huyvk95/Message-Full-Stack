import common from "../common";
import { IAppData } from "../interface/DataInterface";

let initializeState: IAppData = {
    lang: 'en',
    deviceId: '',
    toast: undefined
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.INITIALIZE:
            return Object.assign({}, state, action.payload);
        case common.action.PUSHTOAST:
            return Object.assign({}, state, { toast: action.payload });
        default:
            return state;
    }
}