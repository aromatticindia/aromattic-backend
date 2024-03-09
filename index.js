const express = require ('express');
const passport = require ('passport');
const session = require ('express-session');
const path = require ('path');
const app = express ();
require ('./controllers/auth');
app.use (express.json ());
app.use (express.static (path.join (__dirname, 'client')));

function isLoggedIn (req, res, next) {
  req.user ? next () : res.sendStatus (401);
}

app.get ('/', (req, res) => {
  res.sendFile (__dirname + '/index.html');
});

app.use (
  session ({
    secret: 'mysecret', // we can set custom secret here 
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},  // make it true when using https
  })
);

app.use (passport.initialize ());
app.use (passport.session ());
app.get (
  '/auth/google',
  passport.authenticate ('google', {
    scope: ['email', 'profile'],
  })
);

app.get (
  '/auth/google/callback',
  passport.authenticate ('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get ('/auth/google/failure', (req, res) => {
  res.send ('Something went wrong!'); // can redirect to some page here 
});

app.get ('/auth/protected', isLoggedIn, (req, res) => { //isLoggedIn can be used for protected routes if needed 
  let name = req.user.displayName;
  res.send (`Hello ${name}`); // can redirect to some page here 
});

app.use ('/auth/logout', (req, res) => {
  req.session.destroy ();
  res.send ('See you again!'); // can redirect to home page since we are logging out
});

app.listen (5000, () => {
  console.log ('Listening on port 5000');
});