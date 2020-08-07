import common from "../common";
import { v4 as uuidv4 } from "uuid";
import * as api from "../Api";
import { IToastItemProps } from "../interface/ComponentInterface";

export function initialize() {
    /* __Device Id__ */
    let deviceId = localStorage.getItem('deviceId');
    // Check deviceId exist
    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('deviceId', deviceId);
    }

    /* __Language__ */
    let lang = localStorage.getItem('lang');
    // Check deviceId exist
    if (!lang) {
        lang = "en";
        localStorage.setItem('lang', lang);
    }

    /* __API_CONFIG__ */
    api.config({ "deviceId": deviceId })
    api.config({ "accept-language": lang })

    return {
        type: common.action.INITIALIZE,
        payload: {
            initialized: true,
            deviceId
        },
    }
}

export function pushToast(data: IToastItemProps) {
    return {
        type: common.action.PUSHTOAST,
        payload: data
    }
}