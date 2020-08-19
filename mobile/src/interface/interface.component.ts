import { IAppData, IUserData, INavigatorData, IChatroomReducerData, IFriendData, IFriendRequestReducer, IMessageData } from "./interface.data";
import { Icon } from "react-native-vector-icons/Icon";

export interface IComponentProps {
    navigation?: any
    route?: {params: any}
}

export interface IApp extends IComponentProps {
    initialize: Function,
}

export interface IMainContent extends IComponentProps {
    chooseContentTab: Function
}

export interface ILoginContainer extends IComponentProps {
    login: Function
    register: Function
}

export interface IMainHeader extends IComponentProps {
    user: IUserData,
    navigation: INavigatorData
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

export interface IMainPeople extends IComponentProps {
    friend: IFriendData[]
    friendRequest: IFriendRequestReducer
    navigation: INavigatorData
    choosePeopleTab: Function
}

export interface IItemPeople extends IComponentProps {
    data: IFriendData
}

export interface IUserInfoContainer extends IComponentProps {
    friend: IFriendData[]
    friendRequest: IFriendRequestReducer
    chatroom: IChatroomReducerData[]
}

export interface IUserProfileContainer extends IComponentProps {
    app: IAppData
    user: IUserData
    logout: Function
    toggleNotification: Function
    toggleSound: Function
    updateUserData: Function
}

export interface IMessageHeader extends IComponentProps {
    chatroomId: string,
    chatroom: IChatroomReducerData[]
    friend: IFriendData[]
}

export interface IMessageContent extends IComponentProps {
    chatroomId: string,
    chatroom: IChatroomReducerData[]
    user: IUserData
    message: { [key in string]: IMessageData[] }
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