import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { Request, Response, NextFunction } from 'express';
import {
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

const { FACEBOOK_ID, FACEBOOK_SECRET } = process.env;
console.log('🎫 passport', FACEBOOK_ID, FACEBOOK_SECRET);

passport.serializeUser<any, any>((user, done) => {
  console.log('serializeUser', user);
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id);
});

const options: StrategyOptionWithRequest = {
  clientID: FACEBOOK_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'email', 'displayName', 'picture.type(large)'],
  passReqToCallback: true,
};
const cb: VerifyFunctionWithRequest = (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log('req.user', req.user);
  // TODO: Implement strategy
  // mock user
  const user = {
    id: `user-${new Date().getTime()}`,
    type: 'facebook',
    name: profile.displayName,
    picture: profile.photos[0].value,
    provider: 'facebook',
    providerId: profile.id,
  };
  done(undefined, user);
};

passport.use(new FacebookStrategy(options, cb));

export default {};
