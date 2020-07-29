/* Reducer data */
export interface IUserData {
    _id: string
    email: string
    emailVerify: {verified: boolean}
    loginTime?: Date
    registrationTime?: Date
    updateTime?: Date
}

/* Store data */
export interface IStoreState {
    user: IUserData
}

/* Common */
export interface IResponseData {
    success: boolean,
    status: number,
    message: string,
    data: any,
}