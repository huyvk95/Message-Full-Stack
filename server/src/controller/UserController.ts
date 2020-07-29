import { Request, Response, NextFunction } from "express";
import { User } from "../database/ModelDatabase";
import { Document } from "mongoose";

/* HANDLE */
async function get(req: Request, res: Response, next: NextFunction) {
    // Response user data
    res.data = req.user;
    // Next function
    next()
}

async function put(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword, firstName, lastName, address, avatar } = req.body;

    // //Check
    // //-Password
    // if (typeof password === 'string' && password.length < 8) return res.status(422).json(ServerUtil.responseError({ req, message: 'msg_valid_password_length' }));
    // //-Permission
    // if ((req.user as any).permission !== PERMISSION.ADMIN && (permission === PERMISSION.MANAGER || permission === PERMISSION.ADMIN))
    //     throw ('msg_permission_error');

    // //Filter option
    // const option: { [key: string]: any } = { password, firstName, lastName, address, phone, permission, gender, active }
    // Object.keys(option).forEach((key: string) => option[key] === undefined ? delete option[key] : {});

    // //Crypt
    // if (option.password) option.password = bcrypt.hashSync(option.password, 12);

    // //Check if user is admin
    // let user = await User.findById(id);
    // if (user && user.get('permission') === PERMISSION.ADMIN) return res.status(403).json(ServerUtil.responseError({ req, message: 'msg_access_deny' }))

    // //Handle
    // await User.findByIdAndUpdate(id, {
    //     ...option,
    //     updateAt: new Date(),
    // })
    //     .then(value => res.status(200).json(ServerUtil.responseSuccess({ req, message: 'msg_update_user_success', data: value })))
    //     .catch((error: Error) => res.status(200).json(ServerUtil.responseError({ req, message: error.message })))

    let user: Document | null = await User.findById(req.user._id);

    if (user) {
        user.set('updateTime', new Date())
        await user.save();
    }

    // Response user data
    res.message = 'Update user data success';
    // Next function
    next()
}

export default { get, put }