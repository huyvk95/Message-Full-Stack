import { Router } from "express";
import authRouter from "./AuthRouter";
import userRouter from "./UserRouter";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();

/* API */
router.use('/auth', authRouter);
/* HOME */
router.use('/', middleware.checkAuth);
/* USER */
router.use('/user', userRouter);

export default router;