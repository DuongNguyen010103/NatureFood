import passport from 'passport';
import LocalStrategy from 'passport-local';
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
import UserModel from '../models/user.model.js';

const localOpts = {
  usernameField: 'email',
};

// Jwt strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
  secretOrKey: 'thisisasecret',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({email: email});
    if (!user) {
        return done(null, false);
    } else if (!user.authenticateUser(password)) {
        return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    console.log(e);
    return done(e, false);
  }
});

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    // Identify user by ID
    const user = await UserModel.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    console.log("jwt stratege");
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', {
    session: false,
});

export const authJwt = passport.authenticate('jwt', {
  session: false,
});