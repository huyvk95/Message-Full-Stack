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
        middleware.data.validator,
        controller.login,
        middleware.data.formatResponse
    )

router.route('/token')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
        ],
        middleware.data.validator,
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.token,
        middleware.data.formatResponse
    )

router.route('/logout')
    .post(
        [
            header('deviceId', 'Device must be string').isString(),
        ],
        middleware.data.validator,
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.logout,
        middleware.data.formatResponse
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
        middleware.data.validator,
        controller.register,
        middleware.data.formatResponse
    )

router.route('/verify')
    .post(
        [
            body('uuid', 'Wrong request').isString()
        ],
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.verify,
        middleware.data.formatResponse
    )

export default router;