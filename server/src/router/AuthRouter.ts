import { Router } from "express";
import { header, body } from "express-validator";
import controller from "../controller/AuthController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* HOME */
router.route('/login')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
            body('email', 'Wrong email format').isEmail().isLength({ min: 12, max: 50 }),
            body('password', 'Password must be string').isString(),
            body('password', 'Password length must be 8 character or more').isLength({ min: 8, max: 32 })
        ],
        middleware.validator,
        controller.login,
        middleware.response
    )

router.route('/token')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
        ],
        middleware.validator,
        middleware.checkAuth,
        controller.token,
        middleware.response
    )

router.route('/logout')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
        ],
        middleware.validator,
        middleware.checkAuth,
        controller.logout,
        middleware.response
    )

router.route('/register')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
            body('email', "Wrong email format").isEmail().isLength({ min: 12, max: 50 }),
            body('password', "Password must be string").isString(),
            body('password', "Password length must be 8 character or more").isLength({ min: 8, max: 32 }),
            body('confirmPassword', "Password must be string").isString(),
            body('confirmPassword', "Password length must be 8 character or more").isLength({ min: 8, max: 32 })
        ],
        middleware.validator,
        controller.register,
        middleware.response
    )

export default router;