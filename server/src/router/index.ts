import { Router } from "express";
import authRouter from "./AuthRouter";
import pageRouter from "./PageRouter";

/* INSTANCE */
let router = Router();

/* HOME */
router.get('/', function (req, res) {
    res.status(200).send('OK')
})
/* API */
router.use('/auth', authRouter);
router.use('/page', pageRouter);

export default router;