/* Reducer data */
export interface IUserData {
    _id: string
    email: string
    emailVerify: {verified: boolean}
    loginTime?: Date
    registrationTime?: Date
    updateTime?: Date
}

export interface IAppData {
    lang: string,
    deviceId: string,
}

/* Store data */
export interface IStoreState {
    app: IAppData
    user: IUserData
}

/* Common */
export interface IResponseData {
    success: boolean,
    status: number,
    message: string,
    data: any,
}