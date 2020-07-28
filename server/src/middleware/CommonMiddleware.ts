import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
// Check authentication for main router
export function middlewareAuth(req: Request, res: Response, next: NextFunction) {
    // Get authorization header
    let authorization = req.headers.authorization?.split(' ') || []
    // Check authorization
    if (authorization[0] == 'Bearer') {
        let token = authorization[1];
        let user = jwt.verify(token, process.env.SECRET_KEY as string);

        if (user) {
            req.user = user;
            return next()
        } else {
            res.statusCode = 401
            res.message = 'Authentication error';
            return middlewareResponse(req, res);
        }
    } else {
        res.statusCode = 401
        res.message = 'Authentication error';
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