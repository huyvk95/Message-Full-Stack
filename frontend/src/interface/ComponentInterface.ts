import { ELoginViewType } from "../common/TypeCommon";
import { IAppData, INavigatorData, IUserData, IFriendData, IFriendRequestReducer } from "./DataInterface";

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
}

/* _______________COMPONENT_______________ */
export interface IAvatarComponentProps {
    url?: string,
    type: "langer" | "medium" | "normal" | "small" | "tiny",
    className?: string,
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
    choosePeopleTab: Function
}

export interface IItemConversationProps {
    data: {
        avatar: string,
        name: string
        lastMessageUser: string,
        lastMessage: string,
        lastMessageTime: Date,
        avatarRead: string,
    }
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
    openPopup: Function
}

export interface IPopupUserInfoProps {
    data: IFriendData,
    friend: IFriendData[], 
    friendRequest: IFriendRequestReducer
    user: IUserData,
    form?: "view" | "friend"
}