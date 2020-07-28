/* Reducer data */
export interface IUserData {
    email: string
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