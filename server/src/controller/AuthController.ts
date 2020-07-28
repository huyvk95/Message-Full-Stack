import { Request, Response, NextFunction } from "express";

/* HANDLE */
async function login(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        // res.send()
        res.statusCode = 200
        res.message = 'Login success'
    } else {
        res.statusCode = 401
        res.message = 'Authenticaion error'
    }
    next();
}

async function logout(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        req.logOut();
    }
    res.statusCode = 200
    res.message = 'Logout success'
}

export default { login, logout }