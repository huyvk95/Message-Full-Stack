import { Response } from "express";
import nodemailer from "nodemailer";

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

export async function sendVerificationMai() {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "huyvk3110@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}