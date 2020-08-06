import common from "../common";
import { EContentTap, EPeopleTap } from "../common/TypeCommon";

export function chooseContentTab(tab: EContentTap) {
    return {
        type: common.action.CHOOSE_CONTENT_TAB,
        payload: tab
    }
}

export function choosePeopleTab(tab: EPeopleTap) {
    return {
        type: common.action.CHOOSE_PEOPLE_TAB,
        payload: tab
    }
}