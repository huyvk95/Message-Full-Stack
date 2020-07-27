import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy, IVerifyOptions } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from "./database/ModelDatabase";

export default function () {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        function (email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
            User.findOne({ email: email }, async function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false) }
                if (user.get('password') !== password) { return done(null, false) }
                done(null, user);
            })
        }
    ))
    
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    }, function (jwt_payload, done) {
        User.findById(jwt_payload._id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser(function (user: any, done: (err: any, id?: any) => void) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, async function (err, user) {
            done(err, user);
        });
    });
}