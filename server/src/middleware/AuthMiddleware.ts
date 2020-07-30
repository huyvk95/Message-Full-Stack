import { Request, Response, NextFunction } from "express";
import { User } from "../database/ModelDatabase";
import { formatResponse } from "./DataMiddleware";
import jwt from "jsonwebtoken";
import util from "../util";
// Check authentication for main router
export function checkAuth(option?: { checkVerified?: boolean }) {
    // Config option
    option = option || {}
    let { checkVerified } = option;
    if(typeof checkVerified !== 'boolean') checkVerified = true;

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // Get authorization header
            let authorization = req.headers.authorization?.split(' ') || []
            // Get device id
            let deviceId = req.header("deviceId");
            // Check authorization
            if (authorization[0] == 'Bearer' && deviceId) {
                let token = authorization[1];
                //Get user data
                let userData: any = jwt.verify(token, process.env.SECRET_KEY as string);
                if (!userData) throw { code: 401, message: "error.auth" }
                // Get user
                let user = await User.findById(userData._id);
                if (!user) throw { code: 401, message: "error.auth" }
                // Check verified
                if(checkVerified) {
                    let verify = user.get('emailVerify');
                    if (!verify.verified) throw { code: 200, message: "User has not been verified" }
                }
                // Check device id
                let device = user.get('device');
                if (device[deviceId] != token) throw { code: 401, message: "error.auth" }
                // Return user data
                req.user = util.common.userPrivateInfoFilter(user.toObject());
                return next()
            } else {
                throw { code: 401, message: "error.auth" }
            }
        } catch (error) {
            util.common.requestErrorHandle(res, error);
            return formatResponse(req, res);
        }
    }
}