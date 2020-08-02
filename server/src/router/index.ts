import { Router } from "express";
import authRouter from "./AuthRouter";
import profileRouter from "./ProfileRouter";
import middleware from "../middleware";

/* INSTANCE */
let router = Router();

/* API */
router.use('/auth', authRouter);
/* HOME */
router.use('/', middleware.auth.checkAuth());
/* USER */
router.use('/profile', profileRouter);

export default router;