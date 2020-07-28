import { Request, Response, NextFunction } from "express";
import { User } from "../database/ModelDatabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import util from "../util";

/* HANDLE */
async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    User.findOne({ email: email }, async function (err, user) {
        if (err) {
            res.statusCode = 500
            res.message = 'Unknow error'
            return next()
        }
        if (!user) {
            res.statusCode = 500
            res.message = "Can't find user"
            return next()
        }
        if (!bcrypt.compareSync(password, user.get('password'))) {
            res.statusCode = 500
            res.message = "Can't find user"
            return next()
        }

        // User data
        let data = util.common.userPrivateInfoFilter(user.toObject())

        // Response
        res.statusCode = 200
        res.message = 'Login success'
        res.data = {
            authorization: jwt.sign(data, process.env.SECRET_KEY as string),
            user: data
        }
        return next()
    })
}

async function logout(req: Request, res: Response, next: NextFunction) {
    res.statusCode = 200
    res.message = 'Logout success'
    next()
}

async function register(req: Request, res: Response, next: NextFunction) {
    const { email, confirmPassword, password, firstName, lastName, address, phone } = req.body;

    //Check password and confirm password
    if (password !== confirmPassword) {
        res.statusCode = 400;
        res.message = "Password not match with confirm password";
        return next();
    }

    //Filter option
    let option = util.common.emptyKeyFilter({ email, password, firstName, lastName, address, phone })

    //Crypt
    if (option.password) option.password = bcrypt.hashSync(option.password, 12);

    //Create table
    const user = new User({
        ...option,
        loginAt: new Date(),
        updateAt: new Date(),
        registrationTime: new Date(),
        active: true,
    })
    await user.save()
        .then(value => {
            // Data
            let data = util.common.userPrivateInfoFilter(value.toObject())
            // Response
            res.statusCode = 200;
            res.message = 'Create user success';
            res.data = {
                authorization: jwt.sign(data, process.env.SECRET_KEY as string),
                user: data
            }
        })
        .catch(error => {
            res.statusCode = 500;
            res.message = error;
        })
    next();
}

export default { login, logout, register }