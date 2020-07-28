import { Router } from "express";
import controller from "../controller/UserController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* HOME */
router.route('/')
    .get(
        controller.get,
        middleware.response
    )

export default router;