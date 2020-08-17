import common from "../common";
import { INavigatorData } from "../interface/interface.data";
import { EPeopleTap, EContentTap, EConversationType } from "../common/common.type";

let initializeState: INavigatorData = {
    contentTab: EContentTap.CONVERSATION,
    peopleTab: EPeopleTap.PEOPLE,
    conversationView: EConversationType.NORMAL,
}

export default function (state = initializeState, action: { type: string, payload: any }) {
    switch (action.type) {
        case common.action.CHOOSE_CONTENT_TAB:
            return Object.values(EContentTap).includes(action.payload) ? Object.assign({}, state, { contentTab: action.payload }) : state;
        case common.action.CHOOSE_PEOPLE_TAB:
            return Object.values(EPeopleTap).includes(action.payload) ? Object.assign({}, state, { peopleTab: action.payload }) : state;
        case common.action.NAVIGATOR_SET_CHATROOM:
            return Object.assign({}, state, { chatroom: action.payload })
        case common.action.SET_CONVERSATION_VIEW:
            return Object.assign({}, state, { conversationView: action.payload })
        default:
            return state;
    }
}