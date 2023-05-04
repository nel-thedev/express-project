var express = require('express');
var router = express.Router();

var Post = require('../models/Post.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find()
    // .sort({})
    // .limit(2)
    .then((allPosts) => {
      allPosts = allPosts.reverse().slice(0, 10);
      res.render('index', { allPosts });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
