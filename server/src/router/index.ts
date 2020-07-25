import { Router } from "express";
import authRouter from "./AuthRouter";

/* INSTANCE */
let router = Router();

/* HOME */
router.get('/', function (req, res) {
    res.status(200).send('OK')
})
/* API */
router.use('/auth', authRouter);

export default router;