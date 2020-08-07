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
            header('deviceId', 'validate.deviceid').isString(),
            body('email', 'validate.email_format').isEmail().isLength({ min: 12, max: 50 }),
            body('password', 'validate.password_format').isString(),
            body('password', 'validate.password_length').isLength({ min: 8, max: 32 })
        ],
        middleware.data.validator,
        controller.login,
        middleware.data.formatResponse
    )

router.route('/token')
    .post(
        [
            header('deviceId', 'validate.deviceid').isString(),
        ],
        middleware.data.validator,
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.token,
        middleware.data.formatResponse
    )

router.route('/logout')
    .post(
        [
            header('deviceId', 'validate.deviceid').isString(),
        ],
        middleware.data.validator,
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.logout,
        middleware.data.formatResponse
    )

router.route('/register')
    .post(
        [
            header('deviceId', 'validate.deviceid').isString(),
            body('email', "validate.email_format").isEmail().isLength({ min: 12, max: 50 }),
            body('firstName', "validate.first_name_required").isString(),
            body('lastName', "validate.last_name_required").isString(),
            body('password', "validate.password_format").isString(),
            body('password', "validate.password_length").isLength({ min: 8, max: 32 }),
            body('confirmPassword', "validate.confirm_password_format").isString(),
            body('confirmPassword', "validate.confirm_password_length").isLength({ min: 8, max: 32 })
        ],
        middleware.data.validator,
        controller.register,
        middleware.data.formatResponse
    )

router.route('/verify')
    .post(
        [
            body('uuid', 'error.bad').isString()
        ],
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.verify,
        middleware.data.formatResponse
    )

router.route('/resendVerify')
    .post(
        middleware.auth.checkAuth({ checkVerified: false }),
        controller.resendVerifyMail,
        middleware.data.formatResponse
    )

export default router;