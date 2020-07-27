import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";

export function middlewareAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isUnauthenticated()) {
        res.statusCode = 401
        res.message = 'Authentication error';
        return middlewareResponse(req, res);
    } else next();
}

export function middlewareResponse(req: Request, res: Response) {
    //Get variable
    let success = res.statusCode >= 200 && res.statusCode <= 299;
    let status = res.statusCode;
    let message = res.message;
    let data = res.data;
    //Send
    res.status(200).json({ success, status, message, data });
}