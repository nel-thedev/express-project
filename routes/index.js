var express = require('express');
var router = express.Router();

var Post = require('../models/Post.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find()
    .then((allPosts) => {
      allPosts = allPosts.reverse();
      res.render('index', { allPosts });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
