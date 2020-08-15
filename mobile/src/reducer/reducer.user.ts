import common from "../common";
import { IUserData } from "../interface/interface.data";

let initializeState: IUserData = {
    _id: '',
    email: '',
    emailVerify: { verified: false }
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.LOGIN:
            return Object.assign({}, state, action.payload);
        case common.action.REGISTER:
            return Object.assign({}, state, action.payload);
        case common.action.TOKEN:
            return Object.assign({}, state, action.payload);
        case common.action.UPDATE_USER_DATA:
            return Object.assign({}, state, action.payload);
        case common.action.CLEAN_USER_DATA:
            return { _id: '', email: '', emailVerify: { verified: false } } as IUserData;
        case common.action.VERIFY:
            return Object.assign({}, state, { emailVerify: { verified: true } });
        case common.action.LOGOUT:
            return Object.assign({}, state, { email: '' });
        default:
            return state;
    }
}