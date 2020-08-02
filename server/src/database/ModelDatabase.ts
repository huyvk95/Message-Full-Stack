import { Schema, model } from "mongoose";
import { request } from "express";

const UserSchema = new Schema({
    // Info
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    // Status
    device: { type: Object },
    online: { type: Boolean, default: false},
    // Config
    emailVerify: {
        verified: { type: Boolean, required: true, default: false },
        uuid: { type: String, required: true },
    },
    updateTime: { type: Date, required: true },
    loginTime: { type: Date, required: true },
    lastOnlineTime: { type: Date, required: true },
    registrationTime: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
    // App
    chatrooms: [{
        notification: { type: Boolean, default: true },
        archive: { type: Boolean, default: true },
        block: { type: Boolean, default: false },
        chatroom: { type: Object, required: true },
        active: { type: Boolean, default: false },
    }],
    // Friend
    friends: [{
        nickname: { type: String },
        user: { type: Object, required: true }
    }],
    friendRequest: [{
        queue: [{ type: Object, required: true }],
        request: [{ type: Object, required: true }]
    }]
})

const ChatroomSchema = new Schema({
    // Info
    name: { type: String },
    users: [{ type: Object, required: true }],
    // Chat
    message: [{ type: Object, required: true }],
    // Config
    createdTime: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
})

const MessageSchema = new Schema({
    user: { type: Object, required: true },
    message: { type: String, required: true },
    createdTime: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
})

export const User = model('User', UserSchema, 'user')
export const Chatroom = model('Chatroom', ChatroomSchema, 'chatroom')
export const Message = model('Message', MessageSchema, 'message')