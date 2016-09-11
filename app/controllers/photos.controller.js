var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Category = require('mongoose').model('Category'),
    passport = require("passport");


//Get /addphoto
function getAddPhoto(req, res) {
  res.render('photo/new', { message: req.flash('errorMessage') });
}

//Post /addphoto


module.exports = {

  getAddPhoto: getAddPhoto
}
