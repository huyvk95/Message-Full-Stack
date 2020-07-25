"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    avatar: { type: String },
    updateAt: { type: Date, required: true },
    loginAt: { type: Date, required: true },
    registrationTime: { type: Date, required: true },
    emailVerified: { type: Boolean, required: true, default: false },
    emailVerificationCode: String,
    active: { type: Boolean, required: true, default: true },
});
exports.User = mongoose_1.model('User', UserSchema, 'user');
//# sourceMappingURL=ModelDatabase.js.map