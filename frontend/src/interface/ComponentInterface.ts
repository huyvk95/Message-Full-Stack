import { ELoginViewType } from "../common/TypeCommon";
import { IAppData, INavigatorData, IUserData, IFriendData, IFriendRequestReducer, IChatroomReducerData } from "./DataInterface";

/* _______________CONTAINER_______________ */
/* LOGIN */
export interface ILoginContainerProps {
    login: Function
    register: Function
}

export interface ILoginContainerState {
    viewType: ELoginViewType,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
}

/* HOME */
export interface IHomeContainerProps {
    app: IAppData,
    user: IUserData,
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
    pushToast: Function
    chooseContentTab: Function
    choosePeopleTab: Function
    getAllChatrooms: Function
    createChatroom: Function
}

/* _______________COMPONENT_______________ */
export interface IAvatarComponentProps {
    url?: string,
    online?: {
        status: boolean,
        lastOnlineTime: string,
    }
    size: "langer" | "medium" | "normal" | "small" | "tiny",
    className?: string,
    onClick?: Function
}

export interface IFooterComponentProps {
    navigation: INavigatorData
    chooseContentTab: Function
}

export interface IContentBodyProps {
    navigation: INavigatorData
}

export interface IContentPeopleProps {
    navigation: INavigatorData
    friend: IFriendData[]
    friendRequest: IFriendRequestReducer
    choosePeopleTab: Function
}

export interface IToastItemProps {
    autohide?: number
    onClick?: Function
    content: string | JSX.Element
    time: Date
}

export interface IPopupProps {
    show?: boolean,
    header?: {
        btnLeft?: {
            title: string,
            func?: Function,
        }
        btnRight?: {
            title: string,
            func?: Function,
        }
        title: string
    }
    body?: JSX.Element | string | undefined
    openRecent?: boolean
}

export interface IContentHeaderProps {
    navigation: INavigatorData
    user: IUserData
    openPopup: Function
    openDropdown: Function
}

export interface IPopupUserInfoProps {
    openPopup: Function,
    closePopup: Function,
    chooseContentTab: Function,
    setChatroom: Function,
    data: IFriendData,
    friend: IFriendData[],
    friendRequest: IFriendRequestReducer
    user: IUserData,
    form?: "view" | "friend",
    chatroom: IChatroomReducerData[]
}

export interface IPopupConfirmProps {
    closePopup: Function
    content: JSX.Element | string
    buttons: {
        title: string,
        primary?: boolean,
        func?: Function
    }[]
}

export interface IPopupSettingProps {
    app: IAppData,
    user: IUserData
    toggleNotification: Function
    toggleSound: Function
}

export interface IPopupProfileProps {
    user: IUserData
    updateUserData: Function
    pushToast: Function
    closePopup: Function
}

export interface IItemConversationProps { 
    data: IChatroomReducerData,
    user: IUserData, 
    friend: IFriendData[] 
    navigation: INavigatorData
    openDropdown: Function
}

export interface IContentConversationProps {
    chatroom: IChatroomReducerData[]
}

export interface IContentChatProps {
    navigation: INavigatorData
    chatroom: IChatroomReducerData[]
}

export interface IContentChatHeaderProps extends IContentChatProps{
    friend: IFriendData[]
}

export interface IContentChatControlProps extends IContentChatProps{
}

export interface IContentChatMessageProps extends IContentChatProps{
}