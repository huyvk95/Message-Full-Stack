import { Router } from "express";
import { body } from "express-validator";
import controller from "../controller/UserController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* ROUTE */
router.route('/')
    .get(
        controller.get,
        middleware.response
    )
    .put(
        controller.put,
        middleware.response
    )

router.route('/verify')
    .post(
        [
            body('uuid', 'Wrong request').isString()
        ],
        middleware.validator,
        controller.verify,
        middleware.response
    )

export default router;