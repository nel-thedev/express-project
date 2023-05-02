var express = require('express');
var router = express.Router();

var Post = require('../models/Post.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find()
    .then((allPosts) => {
      res.render('index', { allPosts });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
