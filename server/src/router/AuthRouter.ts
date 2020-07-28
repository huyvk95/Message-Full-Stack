import { Router } from "express";
import { check } from "express-validator";
import controller from "../controller/AuthController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* HOME */
router.route('/login')
    .post(
        [
            check('email', 'Wrong email format').isEmail().isLength({ min: 12, max: 50 }),
            check('password', 'Password must be string').isString(),
            check('password', 'Password length must be 8 character or more').isLength({ min: 8, max: 32 })
        ],
        middleware.validator,
        controller.login,
        middleware.response
    )

router.route('/token')
    .post(
        middleware.checkAuth,
        controller.token,
        middleware.response
    )

router.route('/logout')
    .post(
        controller.logout,
        middleware.response
    )

router.route('/register')
    .post(
        [
            check('email', "Wrong email format").isEmail().isLength({ min: 12, max: 50 }),
            check('password', "Password must be string").isString(),
            check('password', "Password length must be 8 character or more").isLength({ min: 8, max: 32 }),
            check('confirmPassword', "Password must be string").isString(),
            check('confirmPassword', "Password length must be 8 character or more").isLength({ min: 8, max: 32 })
        ],
        controller.register,
        middleware.response
    )

export default router;