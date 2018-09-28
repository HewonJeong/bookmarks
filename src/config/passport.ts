import passport from 'passport';
import passportFacebook from 'passport-facebook';
import {
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-facebook';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import User, { Provider } from '../database/models/User';

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
  try {
    const searchCondition = {
      type: Provider.Facebook,
      providerId: profile.id,
    };
    const [user] = await User.findOrCreate({
      where: searchCondition,
      defaults: {
        type: Provider.Facebook,
        providerId: profile.id,
        name: profile.displayName,
        picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
      },
    });
    done(undefined, user);
  } catch (error) {
    // DB error
    done(error);
  }
};

passport.use(new FacebookStrategy(options, cb));

type middleware = (req: Request, res: Response, next: NextFunction) => void;

/* Login Required middleware */
export const isAuthenticated: middleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  next(new Error('User is not logged in'));
};

/* Authorization Required middleware */
export const isAuthorized: middleware = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
