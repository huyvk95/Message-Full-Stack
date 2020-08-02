import { Response } from "express";
import nodemailer from "nodemailer";
import i18next from "i18next";

export function requestErrorHandle(res: Response, error: any) {
    res.statusCode = error.code || 500
    res.message = error.message || error || "error.unknow"
}

export function userPrivateInfoFilter(info: { [key: string]: any }) {
    const filter = ['_id', 'email', 'firstName', 'lastName', 'avatar', 'updateTime', 'loginTime', 'registrationTime', 'emailVerify']
    //Filter
    Object.keys(info).forEach((key: string) => {
        if (filter.every(o => o != key)) delete info[key]
        // Custom filter
        if (key == 'emailVerify') delete info[key]['uuid']
    });
    //Return payload
    return info;
}

export function emptyKeyFilter(payload: { [key: string]: any }) {
    //Filter
    Object.keys(payload).forEach((key: string) => {
        if (payload[key] === undefined) delete payload[key]
    });
    //Return payload
    return payload;
}

export function dataKeysFilter(data: { [key in string]: any }, keys: string[]) {
    Object.keys(data).forEach((key: string) => {
        if (keys.every(o => o != key)) delete data[key]
    });
    //Return payload
    return data;
}

export async function sendMail(email: string, title: string, text: string) {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'huyvk3110@gmail.com',
            pass: 'edehzalhfczrwnkc'
        }
    });
    //-Sender address and list of recipients
    const message = {
        from: 'huyvk3110@gmail.com',
        to: email,
        subject: title,
        text: text
    };
    await new Promise((res, rej) => {
        transport.sendMail(message, (err, info) => {
            if (err && !info) return rej(err)
            res(info)
        });
    })
}