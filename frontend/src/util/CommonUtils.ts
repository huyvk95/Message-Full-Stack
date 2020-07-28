import { AxiosResponse } from "axios";
import { IResponseData } from "../interface/DataInterface";
import { v4 as uuidv4 } from "uuid";

export function responseFormat(response?: AxiosResponse): IResponseData {
    return response?.data || { success: false, status: undefined, data: undefined }
}

export function getDeviceId() {
    // Device Id
    let deviceId = localStorage.getItem('deviceId');
    // Check deviceId exist
    if(!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}