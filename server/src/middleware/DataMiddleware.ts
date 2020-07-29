import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Validator body data
export function validator(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.statusCode = 400;
        res.message = error.array().map(o => req.t(o.msg)).join('\n');
        return formatResponse(req, res);
    }
    next();
}

// Formated response data must have "success status message data" in response
export function formatResponse(req: Request, res: Response) {
    //Get variable
    let success = res.statusCode >= 200 && res.statusCode <= 299;
    let status = res.statusCode;
    let message = typeof res.message == 'string' ? req.t(res.message) : undefined;
    let data = res.data;
    //Send
    res.status(200).json({ success, status, message, data });
}