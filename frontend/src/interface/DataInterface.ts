import { EContentTap, EPeopleTap } from "../common/TypeCommon";

/* Reducer data */
export interface IUserData {
    _id: string
    email: string
    emailVerify: { verified: boolean }
    loginTime?: Date
    registrationTime?: Date
    updateTime?: Date
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
}

/* Common */
export interface IAuthData {
    deviceId: string,
    token: string
}

export interface IResponseData {
    success: boolean,
    status: number,
    message: string,
    data: any,
}