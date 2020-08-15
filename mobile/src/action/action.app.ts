import common from "../common";
import * as api from "../api";
import { EViewType } from "../common/common.type";
import { getUniqueId } from "react-native-device-info";
import AsyncStorage from "@react-native-community/async-storage";

export function initialize() {
    return async function (dispatch: Function) {
        try {
            /* __Device Id__ */
            let deviceId = await AsyncStorage.getItem('deviceId');
            // Check deviceId exist
            if (!deviceId) {
                deviceId = getUniqueId();
                await AsyncStorage.setItem('deviceId', deviceId);
            }

            /* __Language__ */
            let lang = await AsyncStorage.getItem('lang');
            // Check deviceId exist
            if (!lang) {
                lang = "en";
                await AsyncStorage.setItem('lang', lang);
            }

            /* __Sound__ */
            let soundData = await AsyncStorage.getItem('sound');
            let sound = soundData ? JSON.parse(soundData) : true
            // Check deviceId exist
            if (!soundData) {
                sound = true;
                await AsyncStorage.setItem('sound', JSON.stringify(sound));
            }

            /* __Notification__ */
            let notificationData = await AsyncStorage.getItem('notification');
            let notification = notificationData ? JSON.parse(notificationData) : true
            // Check deviceId exist
            if (!notificationData) {
                notification = true;
                await AsyncStorage.setItem('notification', JSON.stringify(notification));
            }

            /* __API_CONFIG__ */
            api.config({ "deviceId": deviceId })
            api.config({ "accept-language": lang })

            dispatch({
                type: common.action.INITIALIZE,
                payload: {
                    initialized: true,
                    deviceId,
                    lang,
                    sound,
                    notification
                },
            })
        } catch (error) {
            console.error(error)
        }
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
    return async function (dispatch: Function) {
        try {
            await AsyncStorage.setItem('sound', JSON.stringify(state));
            dispatch({
                type: common.action.TOGGLE_SOUND,
                payload: state
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export function toggleNotification(state: boolean) {
    return async function (dispatch: Function) {
        try {
            await AsyncStorage.setItem('notification', JSON.stringify(state));
            dispatch({
                type: common.action.TOGGLE_NOTIFICATION,
                payload: state
            })
        } catch (error) {
            console.error(error)
        }
    }
}