var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

// SIGN UP -------------------------------------------------------------

router.get('/signup', isLoggedOut, function (req, res, next) {
  res.render('auth/signup.hbs');
});

router.post('/signup', isLoggedOut, (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage:
        'All fields are mandatory. Please provide your username, email and password.',
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then((createdUser) => {
      console.log('Created user: ', createdUser);
      req.session.user = createdUser;
      res.redirect('/user/profile/');
    });
});

// ---------------------------------------------------------------

// LOG IN ---------------------------------------------------------------------------------

router.get('/login', isLoggedOut, function (req, res, next) {
  res.render('auth/login.hbs');
});

router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render('auth/login.hbs', {
          errorMessage: 'Incorrect username or password',
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/user/profile');
      } else {
        res.render('auth/login', {
          errorMessage: 'Incorrect username or password',
        });
      }
    })
    .catch((err) => console.log(err));
});

// ---------------------------------------------------------------

// LOG OUT ---------------------------------------------------------------------------------

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect('/');
  });
});

// --------------------------------------------------------------

module.exports = router;
