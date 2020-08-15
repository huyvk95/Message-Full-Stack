import { AxiosResponse } from "axios";
import { IResponseData } from "../interface/DataInterface";
import _ from "underscore";

export function responseFormat(response?: AxiosResponse): IResponseData {
    return response?.data || { success: false, status: undefined, data: undefined }
}

export function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}