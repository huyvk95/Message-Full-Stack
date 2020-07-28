import common from "../common";
import { IUserData } from "../interface/DataInterface";

let initializeState: IUserData = {
    email: ''
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.LOGIN:
            return Object.assign({}, state, action.payload);
        case common.action.TOKEN:
            return Object.assign({}, state, action.payload);
        case common.action.LOGOUT:
            return Object.assign({}, state, { email: '' });
        default:
            return state;
    }
}