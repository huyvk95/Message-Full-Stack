import { EContentTap, EPeopleTap, EViewType } from "../common/TypeCommon";
import { IToastItemProps, IPopupProps } from "./ComponentInterface";

/* Reducer data */
export interface IUserData {
    _id: string
    email: string
    firstName?: string
    lastName?: string
    avatar?: string
    updateTime?: string
    loginTime?: string
    registrationTime?: string
    lastOnlineTime?: string
    emailVerify: { verified: boolean }
    online?: boolean
}

export interface IFriendData {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    online: boolean,
    lastOnlineTime: string,
    nickname: string,
    active: boolean,
}

export interface IFriendRequest {
    _id: string,
    from: IFriendData,
    to: IFriendData,
}

export interface IFriendRequestReducer {
    receive: IFriendRequest[],
    sent: IFriendRequest[]
}

export interface IAppData {
    lang: string,
    deviceId: string,
    notification: boolean,
    sound: boolean,
    viewType: string
    unreadChatroom: boolean,
    toast?: IToastItemProps,
    dropdown?: {
        content: JSX.Element,
        position: { x: number, y: number }
    }
    popup: IPopupProps
    popupBackup?: IPopupProps
}

export interface INavigatorData {
    contentTab: EContentTap,
    peopleTab: EPeopleTap
    chatroom?: string,
    conversationView: string,
}

export interface IChatroomReducerData {
    chatroom: IChatroomData,
    myChatroom: IUserChatroomData,
    friendsChatroom: IUserChatroomData[],
}

/* Store data */
export interface IStoreState {
    app: IAppData
    user: IUserData
    navigation: INavigatorData
    friend: IFriendData[]
    friendRequest: IFriendRequestReducer
    chatroom: IChatroomReducerData[]
    message: { [key in string]: IMessageData[] }
}

/* Common */
export interface IAuthData {
    deviceId: string,
    token: string
}

export interface IPayloadData {
    success: boolean,
    message?: string,
    data?: any
}

export interface IUserChatroomData {
    _id: string,
    user: IFriendData,
    read: boolean,
    notification: boolean,
    archive: boolean,
    block: boolean,
    chatroom: string,
    show: boolean,
    active: boolean,
}

export interface IChatroomData {
    _id: string,
    name: string,
    type: 'conversation' | 'group'
    lastMessage?: IMessageData
    createdTime: string
    updateTime: string
    active: boolean
}

export interface IMessageData {
    _id: string,
    chatroom: string
    user: IFriendData | string,
    message: string,
    createdTime: string,
    active: boolean,
}

export interface IResponseData extends IPayloadData {
    status: number,
}

export interface ISocketTransmitData {
    evt: string,
    payload: any
}

export interface ISocketResponseData {
    evt: string,
    payload: IPayloadData
}