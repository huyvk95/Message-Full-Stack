import { Request, Response } from "express";

/* HANDLE */
async function login(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        // res.send()
        res.send('Login success')
    } else {
        res.send('Authenticaion error')
    }
}

async function logout(req: Request, res: Response) {
    if (req.isAuthenticated()) {
        req.logOut();
    }
    res.send('Logout success')
}

export default { login, logout }