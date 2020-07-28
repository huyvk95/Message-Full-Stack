import common from "../common";
import { IUserData } from "../interface/DataInterface";

let initializeState: IUserData = {
    email: ''
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.LOGIN:
            let data: IUserData = action.payload;
            return Object.assign({}, state, data);
        case common.action.LOGOUT:
            return Object.assign({}, state, { email: '' });
        default:
            return state;
    }
}