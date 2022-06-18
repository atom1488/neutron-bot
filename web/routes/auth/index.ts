import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => res.sendStatus(200));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send({ msg: 'Success' });
});

export default router;
