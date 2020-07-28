import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { User } from "../database/ModelDatabase";
import jwt from "jsonwebtoken";
import util from "../util";
// Check authentication for main router
export async function middlewareAuth(req: Request, res: Response, next: NextFunction) {
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
            if (!userData) throw { code: 401, message: "Authentication error" }
            // Get user
            let user = await User.findById(userData._id);
            if (!user) throw { code: 401, message: "Authentication error" }
            // Check device id
            let device = user.get('device');
            if(device[deviceId] != token) throw { code: 401, message: "Authentication error" }
            // Return user data
            req.user = util.common.userPrivateInfoFilter(user.toObject());
            return next()
        } else {
            throw { code: 401, message: "Authentication error" }
        }
    } catch (error) {
        util.common.requestErrorHandle(res, error);
        return middlewareResponse(req, res);
    } 
}

// Validator body data
export function middlewareValidator(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.statusCode = 400;
        res.message = error.array().map(o => o.msg).join('\n');
        return middlewareResponse(req, res);
    }
    next();
}

// Formated response data must have "success status message data" in response
export function middlewareResponse(req: Request, res: Response) {
    //Get variable
    let success = res.statusCode >= 200 && res.statusCode <= 299;
    let status = res.statusCode;
    let message = res.message;
    let data = res.data;
    //Send
    res.status(200).json({ success, status, message, data });
}