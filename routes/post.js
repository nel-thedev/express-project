var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Post = require('../models/Post.model');
const User = require('../models/User.model');

const {
  isLoggedIn,
  isLoggedOut,
  isPostOwner,
} = require('../middleware/route-guard');

// HAVE TO ADD ROUTE PROTECTION
router.get('/new-post', isLoggedIn, (req, res, next) => {
  res.render('post/new-post.hbs');
});

// router.post('/new-post', (req, res, next) => {
//   const { title, content, tags } = req.body;

//   Post.create({
//     user: req.session.user._id,
//     title,
//     content,
//     tags,
//   })
//     .then((newPost) => {
//       return User.findByIdAndUpdate(newPost.user, {
//         $push: { posts: newPost._id },
//         new: true,
//       }).then(() => {
//         console.log('Created: ', newPost);
//         res.redirect(`/post/${newPost._id}`);
//       });
//     })
//     .catch((err) => console.log(err));
// });

//router.post('/new-post') async/await version
router.post('/new-post', isLoggedIn, async (req, res) => {
  try {
    const createdPost = await Post.create({
      ...req.body,
      user: req.session.user._id,
    });
    console.log('here after create post');
    await User.findByIdAndUpdate(createdPost.user, {
      $push: { posts: createdPost._id },
      new: true,
    });
    console.log('here after update user');
    res.redirect(`/post/${createdPost._id}`);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    })
    .then((post) => {
      res.render('post/post.hbs', { post });
    })
    .catch((err) => console.log(err));
});

router.get('/:id/edit-post', isPostOwner, function (req, res, next) {
  Post.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    })
    .then((post) => {
      res.render('post/edit-post.hbs', { post });
    })
    .catch((err) => console.log(err));
});

router.post('/:id/edit-post', isPostOwner, (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, {
    ...req.body,
    new: true,
  });
});

router.get('/:id/add-to-favorites', isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(req.session.user._id, {
    $push: { favorites: req.params.id },
    new: true,
  });
  Post.findByIdAndUpdate(req.params.id, {
    $push: { favorites: req.session.user._id },
    new: true,
  })

    .then(() => {
      res.redirect(`/post/${req.params.id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
