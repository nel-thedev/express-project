var express = require('express');
var router = express.Router();

var User = require('../models/User.model');

router.get('/profile', function (req, res, next) {
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

module.exports = router;
