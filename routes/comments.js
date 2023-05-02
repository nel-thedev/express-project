var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const { isLoggedIn } = require('../middleware/route-guard');

router.post('/add-comment/:id', isLoggedIn, function (req, res, next) {
  Comment.create({
    user: req.session.user._id,
    content: req.body.comment,
  })
    .then((newComment) => {
      console.log('New comment: ', newComment);
      return Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: newComment._id },
        new: true,
      });
    })
    .then((updatedPost) => {
      console.log('Updated post: ', updatedPost);
      res.redirect(`/post/${updatedPost._id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
