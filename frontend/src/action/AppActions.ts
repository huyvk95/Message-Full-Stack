import common from "../common";
import { v4 as uuidv4 } from "uuid";
import * as api from "../Api";
import { IToastItemProps, IPopupProps } from "../interface/ComponentInterface";
import { EViewType } from "../common/TypeCommon";
import { IMessageData, IChatroomReducerData } from "../interface/DataInterface";
import { type } from "os";

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

    /* __Sound__ */
    let soundData = localStorage.getItem('sound');
    let sound = soundData ? JSON.parse(soundData) : true
    // Check deviceId exist
    if (!soundData) {
        sound = true;
        localStorage.setItem('sound', JSON.stringify(sound));
    }

    /* __Notification__ */
    let notificationData = localStorage.getItem('notification');
    let notification = notificationData ? JSON.parse(notificationData) : true
    // Check deviceId exist
    if (!notificationData) {
        notification = true;
        localStorage.setItem('notification', JSON.stringify(notification));
    }

    /* __API_CONFIG__ */
    api.config({ "deviceId": deviceId })
    api.config({ "accept-language": lang })

    return {
        type: common.action.INITIALIZE,
        payload: {
            initialized: true,
            deviceId,
            lang,
            sound,
            notification
        },
    }
}

export function setAppViewType(type: EViewType) {
    return {
        type: common.action.SET_VIEW_TYPE,
        payload: type
    }
}

export function setUnreadChatroom(state: boolean) {
    return {
        type: common.action.SET_UNREAD_STATE,
        payload: state
    }
}

export function toggleSound(state: boolean) {
    localStorage.setItem('sound', JSON.stringify(state));
    return {
        type: common.action.TOGGLE_SOUND,
        payload: state
    }
}

export function toggleNotification(state: boolean) {
    localStorage.setItem('notification', JSON.stringify(state));
    return {
        type: common.action.TOGGLE_NOTIFICATION,
        payload: state
    }
}

export function pushToast(data: IToastItemProps) {
    return {
        type: common.action.PUSH_TOAST,
        payload: data
    }
}

export function closePopup(openRecent: boolean = false) {
    return {
        type: common.action.CLOSE_POPUP,
        payload: openRecent
    }
}

export function openPopup(data: IPopupProps) {
    return {
        type: common.action.OPEN_POPUP,
        payload: data
    }
}

export function openDropdown(content: JSX.Element, position: { x: number, y: number }) {
    return {
        type: common.action.OPEN_DIALOG,
        payload: { content, position }
    }
}

export function closeDialog() {
    return {
        type: common.action.CLOSE_DIALOG,
        payload: undefined
    }
}
