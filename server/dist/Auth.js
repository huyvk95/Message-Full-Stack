"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const ModelDatabase_1 = require("./database/ModelDatabase");
function default_1() {
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    }, function (jwt_payload, done) {
        ModelDatabase_1.User.findById(jwt_payload._id, function (err, user) {
            if (err)
                return done(err, false);
            if (user)
                return done(null, user);
            else
                return done(null, false);
        });
    }));
    passport_1.default.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport_1.default.deserializeUser(function (id, done) {
        ModelDatabase_1.User.findById(id, function (err, user) {
            return __awaiter(this, void 0, void 0, function* () {
                done(err, user);
            });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=Auth.js.map