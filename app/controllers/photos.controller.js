var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Category = require('mongoose').model('Category'),
    passport = require("passport");


//Get /addphoto
function getAddPhoto(req, res) {
  res.render('photo/new', { message: req.flash('errorMessage') });
}

//Post /addphoto
function postAddPhoto(req, res) {
}

//Get /view-edit-photo
function getViewPhoto(req, res) {
  res.render('photo/show', { message: req.flash('errorMessage') });
}

//Put /view-edit-photo
function putEditPhoto(req, res) {
}



module.exports = {

  getAddPhoto: getAddPhoto,
  postAddPhoto: postAddPhoto,
  getViewPhoto: getViewPhoto,
  putEditPhoto: putEditPhoto

}
