import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    avatar: { type: String },
    device: { type: Object },
    updateTime: { type: Date, required: true },
    loginTime: { type: Date, required: true },
    registrationTime: { type: Date, required: true },
    emailVerify: {  
        verified: {type: Boolean, required: true, default: false},
        uuid: { type: String, required: true },
    },
    active: { type: Boolean, required: true, default: true },
})

export const User = model('User', UserSchema, 'user')