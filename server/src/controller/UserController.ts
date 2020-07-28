import { Request, Response, NextFunction } from "express";

/* HANDLE */
async function get(req: Request, res: Response, next: NextFunction) {
    // Response user data
    res.data = req.user;
    // Next function
    next()
}

export default { get }