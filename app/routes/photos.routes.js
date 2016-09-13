module.exports = function(app) {
  var express           = require('express');
  var passport          = require("passport");
  var usersController   = require('../controllers/users.controller');
  var photosController = require('../controllers/photos.controller');
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

  app.route("/sign-s3")
  .get(authenticatedUser, photosController.getSignS3);


  app.route("/newphoto")
    .get(authenticatedUser, photosController.getAddPhoto)
    .post(authenticatedUser, photosController.postPhotoDetails);

  app.route("/view-edit-photo/:photo_id")
    .get(authenticatedUser, photosController.getViewPhoto)
    .put(authenticatedUser, photosController.putEditPhoto);
    //need to add delete?

 };
