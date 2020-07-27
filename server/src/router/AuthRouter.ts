import { Router } from "express";
import passport from "passport";

/* INSTANCE */
let router = Router();

/* HOME */
router.post('/login', passport.authenticate('local', {failureRedirect: '/page/login'}), function(req,res){
    res.redirect('/page/home')
});

export default router;