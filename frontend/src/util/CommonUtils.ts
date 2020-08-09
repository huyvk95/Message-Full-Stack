import { AxiosResponse } from "axios";
import { IResponseData, IFriendData, IUserChatroomData, IChatroomReducerData } from "../interface/DataInterface";
import _ from "underscore";

export function responseFormat(response?: AxiosResponse): IResponseData {
    return response?.data || { success: false, status: undefined, data: undefined }
}
