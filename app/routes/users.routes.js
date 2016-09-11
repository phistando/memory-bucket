module.exports = function(app) {
var express           = require('express');
var passport          = require("passport");
var usersController   = require('../controllers/users.controller');
var staticController = require('../controllers/static.controller');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we can continue with next
  // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
  if (req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'Login to access!');
  return res.redirect('/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'You are already logged in!');
  return res.redirect('/');
}


app.route('/')
  .get(staticController.home);

app.route('/signup')
  .get(unAuthenticatedUser, usersController.getSignup)
  .post(usersController.postSignup);

app.route('/login')
  .get(unAuthenticatedUser, usersController.getLogin)
  .post(usersController.postLogin);

app.route("/logout")
  .get(usersController.getLogout);


// app.route("/userhomepage")
//   .get(authenticatedUser, usersController.userHomePage);


app.route('/:user_id')
    .get(authenticatedUser, usersController.showUserBucket);

app.param('user_id', usersController.user_by_id);


 };
