// middleware/route-guard.js
const Post = require('../models/Post.model');
const User = require('../models/User.model');

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  next();
};

const isProfileOwner = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user._id === req.params.id) {
      return res.redirect('/user/profile');
    }
  }
  next();
};

const isPostOwner = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/auth/login');
  } else {
    Post.findById(req.params.id)
      .populate('user')
      .populate({
        path: 'comments',
        populate: { path: 'user' },
      })
      .then((post) => {
        if (req.session.user._id !== post.user._id.toHexString()) {
          res.render('post/post.hbs', {
            post: post,
            errorMessage: "You cannot modify other users' posts",
          });
        } else {
          next();
        }
      })
      .catch((err) => console.log(err));
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isProfileOwner,
  isPostOwner,
};
