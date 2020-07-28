import { Router } from "express";
import authRouter from "./AuthRouter";
import { middlewareAuth } from "../middleware/CommonMiddleware";

/* INSTANCE */
let router = Router();

/* API */
router.use('/auth', authRouter);
/* HOME */
router.get('/', middlewareAuth);

export default router;