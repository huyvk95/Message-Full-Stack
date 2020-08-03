import { Schema, model } from "mongoose";

// User
const UserSchema = new Schema({
    // Info
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    // Status
    device: { type: Object },
    online: { type: Boolean, default: false },
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
})

const UserChatRoomSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    notification: { type: Boolean, default: true },
    archive: { type: Boolean, default: true },
    block: { type: Boolean, default: false },
    chatroom: { type: Schema.Types.ObjectId, ref: 'Chatroom', required: true },
    active: { type: Boolean, default: false },
})

const UserFriendSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friend: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nickname: { type: String },
})

const FriendRequestSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

// Chatroom
const ChatroomSchema = new Schema({
    // Info
    name: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    // Chat
    message: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true }],
    // Config
    createdTime: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
})

// Message
const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    createdTime: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
})

export const User = model('User', UserSchema, 'user')
export const UserChatRoom = model('UserChatRoom', UserChatRoomSchema, 'userChatRoom')
export const UserFriend = model('UserFriend', UserFriendSchema, 'userFriend')
export const FriendRequest = model('FriendRequest', FriendRequestSchema, 'friendRequest')
export const Chatroom = model('Chatroom', ChatroomSchema, 'chatroom')
export const Message = model('Message', MessageSchema, 'message')