import common from "../common";
import { IAppData } from "../interface/DataInterface";

let initializeState: IAppData = {
    lang: 'en',
    deviceId: ''
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.INITIALIZE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}