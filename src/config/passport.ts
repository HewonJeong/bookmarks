import passport from 'passport';
import passportFacebook from 'passport-facebook';
import { Request, Response, NextFunction } from 'express';
import {
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-facebook';
import User, { createUser, Provider } from '../database/models/User';
const FacebookStrategy = passportFacebook.Strategy;

const { FACEBOOK_ID, FACEBOOK_SECRET } = process.env;
console.log('🎫 passport', FACEBOOK_ID, FACEBOOK_SECRET);

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(undefined, user);
});

const options: StrategyOptionWithRequest = {
  clientID: FACEBOOK_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['displayName', 'email'],
  passReqToCallback: true,
};
const cb: VerifyFunctionWithRequest = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const userParams = {
    type: Provider.Facebook,
    name: profile.displayName,
    picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
    providerId: profile.id,
  };
  const user = await User.create(userParams);
  done(undefined, user);
};

passport.use(new FacebookStrategy(options, cb));

export default {};
