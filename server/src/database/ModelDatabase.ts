import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    avatar: { type: String },
    updateTime: { type: Date, required: true },
    loginTime: { type: Date, required: true },
    registrationTime: { type: Date, required: true },
    emailVerified: { type: Boolean, required: true, default: false },
    emailVerificationCode: String,
    active: { type: Boolean, required: true, default: true },
})

export const User = model('User', UserSchema, 'user')