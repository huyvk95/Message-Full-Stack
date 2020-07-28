import { AxiosResponse } from "axios";
import { IResponseData } from "../interface/DataInterface";

export function responseFormat(response: AxiosResponse): IResponseData {
    return response.data || { success: false, status: undefined, data: undefined, message: 'No response data' }
}