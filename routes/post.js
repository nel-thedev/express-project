var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Post = require('../models/Post.model');

router.get('/new-post', (req, res, next) => {
  res.render('post/new-post.hbs');
});

router.post('/new-post', (req, res, next) => {
  const { title, content, tags } = req.body;

  Post.create({
    user: req.session.user._id,
    title,
    content,
    tags,
  })
    .then((createdPost) => {
      console.log('Created: ', createdPost);
      res.redirect(`/post/post/${createdPost._id}`);
    })
    .catch((err) => console.log(err));
});

router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id)
    .populate('user')
    .then((post) => {
      res.render('post/post.hbs', { post });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
