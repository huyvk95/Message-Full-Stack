import { Router } from "express";

/* INSTANCE */
let router = Router();

/* HOME */
router.get('/home', function (req, res) { 
    res.send('OK') 
});

router.get('/login', function (req, res) { 
    res.sendFile(process.cwd() + '/page/login.html')
});

export default router;