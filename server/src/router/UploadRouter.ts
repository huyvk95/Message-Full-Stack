import { Router } from "express";
import controller from "../controller/UploadController";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();
/* ROUTE */
router.post('/avatar',
    controller.postAvatar,
    middleware.data.formatResponse
)

export default router;