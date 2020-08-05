import { Request, Response, NextFunction } from "express";
import { User } from "../database/ModelDatabase";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import util from "../util";

/* HANDLE */
async function login(req: Request, res: Response, next: NextFunction) {
    try {
        // Body variable
        const { email, password } = req.body;
        // Header variable
        const deviceId = req.header("deviceId");

        User.findOne({ email: email, active: true }, async function (err, user) {
            if (err) {
                res.statusCode = 500
                res.message = 'error.unknow'
                return next()
            }
            if (!user) {
                res.statusCode = 500
                res.message = "error.find_user"
                return next()
            }
            if (!bcrypt.compareSync(password, user.get('password'))) {
                res.statusCode = 500
                res.message = "error.find_user"
                return next()
            }

            // User data
            let data = util.common.userPrivateInfoFilter(user.toObject())

            // Sign token
            let token = jwt.sign(data, process.env.SECRET_KEY as string, { expiresIn: '1d' })

            // Update user data
            user.set('device', Object.assign({}, user.get('device'), { [deviceId as string]: token }))
            user.set('loginTime', new Date())
            await user.save()

            // Response
            res.statusCode = 200
            res.message = 'success.login'
            res.data = {
                authorization: token,
                user: data
            }
            return next()
        })
    } catch (error) {
        res.statusCode = 500
        res.message = error
        return next()
    }
}

async function token(req: Request, res: Response, next: NextFunction) {
    try {
        // Get user
        let user = await User.findById(req.user._id);
        // Check user
        if (!user) throw { code: 401, message: "error.auth" }
        //Update user login time
        user.set('loginTime', new Date());
        await user.save();
        //Send data
        res.statusCode = 200
        res.message = 'success.login'
        res.data = {
            user: req.user
        }
    } catch (error) {
        util.common.requestErrorHandle(res, error)
    } finally {
        return next()
    }
}

async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        // Variable
        const deviceId = req.header("deviceId");
        // Get user
        let user = await User.findById(req.user._id);
        // Check user
        if (!user) throw { code: 401, message: "error.auth" }
        // Handle user data
        let device = Object.assign({}, user.get('device'));
        delete device[deviceId as string];
        user.set('device', device);
        await user.save();

        res.statusCode = 200
        res.message = 'success.logout'
    } catch (error) {
        util.common.requestErrorHandle(res, error)
    } finally {
        return next()
    }
}

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        // Body variable
        const { email, confirmPassword, password, firstName, lastName, address, phone } = req.body;
        // Header variable
        const deviceId = req.header("deviceId");

        // Check password and confirm password
        if (password !== confirmPassword) {
            throw { code: 400, message: "Password not match with confirm password" }
        }

        // Filter option
        let option = util.common.emptyKeyFilter({ email, password, firstName, lastName, address, phone })

        // Crypt password
        option.password = bcrypt.hashSync(option.password, 12);

        // Create uuid
        let uuid = uuidv4();

        // Create document
        let user = new User({
            ...option,
            emailVerify: {
                verified: false,
                uuid: uuid
            },
            loginTime: new Date(),
            lastOnlineTime: new Date(),
            updateTime: new Date(Date.now() - 60000),
            registrationTime: new Date(),
            active: true,
        })
        await user.save()
            .then(async user => {
                // Data
                let data = util.common.userPrivateInfoFilter(user.toObject())
                // Sign token
                let token = jwt.sign(data, process.env.SECRET_KEY as string, { expiresIn: '1d' })
                // Send verify mail
                util.common.sendMail(email, req.t('common.title_resend_verification'), `${req.t('msg.resend_verification')}\nhttp://localhost:3001/verify/${uuid}`)
                // Sign device token
                user.set('device', { [deviceId as string]: token })
                await user.save()
                // Response
                res.statusCode = 200;
                res.message = 'success.create_user';
                res.data = {
                    authorization: token,
                    user: data
                }
            })
            .catch(error => {
                res.statusCode = 500;
                res.message = error;
            })
    } catch (error) {
        util.common.requestErrorHandle(res, error)
    } finally {
        next();
    }
}

async function verify(req: Request, res: Response, next: NextFunction) {
    try {
        let { uuid } = req.body;
        // Get user
        let user = await User.findById(req.user._id);
        if (!user) throw { code: 500, message: "error.find_user" }
        // Check verified
        let verify = user.get('emailVerify');
        if (verify.verified) throw { code: 200, message: "User verified" }
        // Check uuid
        if (uuid != verify.uuid) throw { code: 500, message: "Verification failed" }
        // Save user
        user.set('emailVerify', {
            verified: true,
            uuid: verify.uuid
        })
        await user.save();
        // Response
        res.statusCode = 200;
        res.message = "success.verification"
    } catch (error) {
        util.common.requestErrorHandle(res, error)
    } finally {
        next()
    }
}

async function resendVerifyMail(req: Request, res: Response, next: NextFunction) {
    try {
        // Get user
        let user = await User.findById(req.user._id);
        if (!user) throw { code: 500, message: "error.find_user" }
        // Check verified
        let verify = user.get('emailVerify');
        if (verify.verified) throw { code: 200, message: "User verified" }
        // Check uuid
        await util.common.sendMail(user.get('email'), req.t('common.title_resend_verification'), `${req.t('msg.resend_verification')}\nhttp://localhost:3001/verify/${verify.uuid}`)
        // Response
        res.statusCode = 200;
        res.message = "success.resend_verification"
    } catch (error) {
        util.common.requestErrorHandle(res, error)
    } finally {
        next()
    }
}

export default { login, token, logout, register, verify, resendVerifyMail }