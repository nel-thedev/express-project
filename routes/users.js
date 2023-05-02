var express = require('express');
var router = express.Router();

var User = require('../models/User.model');
const { isLoggedIn, isProfileOwner } = require('../middleware/route-guard');

router.get('/profile', isLoggedIn, function (req, res, next) {
  const user = req.session.user;

  User.findById(user._id)
    .populate({
      path: 'posts',
      populate: { path: 'user' },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'user' },
    })
    .then((foundUser) => {
      res.render('user/profile.hbs', { foundUser });
    });
});

router.get('/public-profile/:id', isProfileOwner, (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: 'posts',
      populate: { path: 'user' },
    })
    .populate({
      path: 'favorites',
      populate: { path: 'user' },
    })
    .then((foundUser) => {
      res.render('user/public-profile.hbs', { foundUser });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
