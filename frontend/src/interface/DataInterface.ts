import { EContentTap, EPeopleTap } from "../common/TypeCommon";

/* Reducer data */
export interface IUserData {
    _id: string
    email: string
    firstName?: string
    lastName?: string
    avatar?: string
    updateTime?: Date
    loginTime?: Date
    registrationTime?: Date
    emailVerify: { verified: boolean }
    online?: boolean
}

export interface IFriendData {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    avatar?: string,
    online: boolean,
    lastOnlineTime: Date,
    active: string,
}

export interface IAppData {
    lang: string,
    deviceId: string,
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

export interface IResponseData extends IPayloadData {
    status: number,
}

export interface ISocketResponseData {
    evt: string,
    payload: IPayloadData
}