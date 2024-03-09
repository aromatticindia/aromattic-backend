const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth2').Strategy;
require ('dotenv').config ();
passport.use (
  new GoogleStrategy (
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email']
    },
    function (request, accessToken, refreshToken, profile, done) {
      done (null, profile);// add user to db
    }
  )
);

passport.serializeUser ((user, done) => {
  done (null, user);
});

passport.deserializeUser ((user, done) => {
  done (null, user);
});