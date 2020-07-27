import { Router } from "express";
import passport from "passport";
import controller from "../controller/AuthController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* HOME */
router.route('/login')
    .post(
        passport.authenticate('local'),
        controller.login,
        middleware.response
    )

router.route('/logout')
    .post(
        controller.logout,
        middleware.response,
    )

export default router;