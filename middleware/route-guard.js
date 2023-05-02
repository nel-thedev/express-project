// middleware/route-guard.js

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    console.log('User not logged in');
    return res.redirect('/auth/login');
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    console.log('User is already logged in');
    return res.redirect('/');
  }
  next();
};

const isProfileOwner = (req, res, next) => {
  if (req.session.user._id === req.params.id) {
    return res.redirect('/user/profile');
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isProfileOwner,
};
