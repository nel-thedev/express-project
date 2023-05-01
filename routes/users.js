var express = require('express');
var router = express.Router();

var User = require('../models/User.model');

router.get('/profile', function (req, res, next) {
  const user = req.session.user;

  res.render('user/profile.hbs', { user });
});

module.exports = router;
