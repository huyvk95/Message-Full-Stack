import { Router } from "express";
import authRouter from "./AuthRouter";
import { middlewareAuth } from "../middleware/CommonMiddleware";

/* INSTANCE */
let router = Router();

/* HOME */
router.get('/', middlewareAuth, function (req, res) {
    res.status(200).send('OK')
})
/* API */
router.use('/auth', authRouter);

export default router;