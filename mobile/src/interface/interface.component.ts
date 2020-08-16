import { IAppData, IUserData, INavigatorData } from "./interface.data";

export interface IComponentProps {
    navigation?: any
}

export interface IApp extends IComponentProps {
    initialize: Function,
    app: IAppData
}

export interface ILoginContainer extends IComponentProps {
    login: Function
    register: Function
}

export interface IHomeContainerProps extends IComponentProps {
    app: IAppData,
    user: IUserData,
    navigation: INavigatorData
    cleanUserData: Function
    getFriend: Function
    pushFriend: Function
    popFriend: Function
    setFriendNickName: Function
    updateFriendData: Function
    getFriendRequest: Function
    popReceiveRequest: Function
    popSentRequest: Function
    pushReceiveRequest: Function
    pushSentRequest: Function
    chooseContentTab: Function
    choosePeopleTab: Function
    getAllChatrooms: Function
    createChatroom: Function
    unfollowChatroom: Function
    updateChatroom: Function
    receiveMessage: Function
    getMessages: Function
    setChatroomNavigation: Function
    setTyping: Function
}