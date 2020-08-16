import { IAppData, IUserData, INavigatorData, IChatroomReducerData, IFriendData } from "./interface.data";

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

export interface IMainHeader extends IComponentProps {
    user: IUserData
}

export interface IMainConversation extends IComponentProps {
    chatroom: IChatroomReducerData[]
}

export interface IItemConversation extends IComponentProps {
    data: IChatroomReducerData
    user: IUserData, 
    friend: IFriendData[] 
    navigation: INavigatorData
    typing: { [key in string]: IFriendData[] }
}

export interface IMainNavigationProps extends IComponentProps {
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