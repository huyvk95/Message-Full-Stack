import { Response } from "express";

export function requestErrorHandle(res: Response, error: any) {
    res.statusCode = error.code || 500
    res.message = error.message || error || "Internal Server Error"
}

export function emptyKeyFilter(payload: { [key: string]: any }) {
    //Filter
    Object.keys(payload).forEach((key: string) => {
        if (payload[key] === undefined) delete payload[key]
    });
    //Return payload
    return payload;
}

export function userPrivateInfoFilter(info: { [key: string]: any }) {
    const filter = ['_id', 'email', 'firstName', 'lastName', 'avatar', 'updateTime', 'loginTime', 'registrationTime', 'emailVerified']
    //Filter
    Object.keys(info).forEach((key: string) => {
        if (filter.every(o => o != key)) delete info[key]
    });
    //Return payload
    return info;
}