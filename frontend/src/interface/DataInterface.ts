import { EContentTap, EPeopleTap } from "../common/TypeCommon";
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
}

/* Store data */
export interface IStoreState {
    app: IAppData
    user: IUserData
    navigation: INavigatorData
    friend: IFriendData[]
    friendRequest: IFriendRequestReducer
    chatroom: IUserChatroomData[]
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
    user: string,
    notification: boolean,
    archive: boolean,
    block: boolean,
    chatroom: IChatroomData,
    active: boolean,
}

export interface IChatroomData {
    _id: string,
    name: string,
    type: 'conversation' | 'group'
    users: IUserData[]
    lastMessage?: IMessageData
    createdTime: string
    updateTime: string
    active: boolean
}

export interface IMessageData {
    _id: string,
    chatroom: string
    user: string,
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