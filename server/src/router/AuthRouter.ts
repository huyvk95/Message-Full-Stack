import { Router } from "express";

/* INSTANCE */
let router = Router();

/* HOME */
router.get('/', function (req, res) { res.send('OK') });

export default router;