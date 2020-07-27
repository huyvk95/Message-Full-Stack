import passport, { use } from "passport";
import bcrypt from "bcrypt";
import { Strategy as JWTStategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./database/ModelDatabase";

export default function () {
    passport.use(new LocalStrategy(
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false);
                if (user.get('password') != password) return done(null, false);
                return done(null, user);;
            })
        }
    ))
    passport.use(new JWTStategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        },
        function (jwt_payload, done) {
            User.findById(jwt_payload._id, function (err, user) {
                if (err) return done(err, false)
                if (user) return done(null, user)
                else return done(null, false)
            })
        }
    ))
    passport.serializeUser(function (user: any, done: (err: any, id?: any) => void) {
        done(null, user._id)
    })
    passport.deserializeUser(function (id, done) {
        User.findById(id, async function (err, user) {
            done(err, user)
        })
    })
}