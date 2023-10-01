const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User, Otp } = require('./db');

const configurePassport = (passport) => {
  // Passport Local Strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false, { message: 'User not found' });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return done(null, false, { message: 'Password does not match' });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Passport Serialization
  passport.serializeUser((user, done) => {
    if (user) return done(null, user.id);
    return done(null, false);
  });

  // Passport Deserialization
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

module.exports = configurePassport;