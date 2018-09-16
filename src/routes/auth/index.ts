import { Router } from 'express';
import passport from 'passport';
import { testFacebook } from './auth.ctrl';

const router = Router();

router.get('/', testFacebook);
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/');
  }
);

export default router;
