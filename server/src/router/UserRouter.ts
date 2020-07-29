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
        middleware.data.formatResponse
    )
    .put(
        controller.put,
        middleware.data.formatResponse
    )

export default router;