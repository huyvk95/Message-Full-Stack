import common from "../common";
import { EContentTap, EPeopleTap } from "../common/common.type";

export function chooseContentTab(tab: EContentTap) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.CHOOSE_CONTENT_TAB,
            payload: tab
        })
    }
}

export function choosePeopleTab(tab: EPeopleTap) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.CHOOSE_PEOPLE_TAB,
            payload: tab
        })
    }
}

export function setChatroomNavigation(id: string) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.NAVIGATOR_SET_CHATROOM,
            payload: id
        })
    }
}

export function setConversationViewType(type: string) {
    return async function (dispatch: Function) {
        dispatch({
            type: common.action.SET_CONVERSATION_VIEW,
            payload: type
        })
    }
}