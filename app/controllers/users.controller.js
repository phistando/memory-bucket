var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    passport = require("passport");




//Get /profile
function profile(req, res) {
  console.log('req.user: ' + req.user);
  Photo.find({user_id: req.user._id})
    .populate('category_id')
    .exec(function(err, photos){
      res.render('user/profile', { message: req.flash('erroMessage'), user: req.user,  photos: photos});
    });

}

//Get /userpublic
function userPublic(req, res) {
  res.render('user/userpublic', { message: req.flash('erroMessage'), user: req.user  });
}


// GET /signup
function getSignup(req, res) {
  res.render('user/signup', { message: req.flash('errorMessage') });
}

// POST /signup
function postSignup(req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  });

  return signupStrategy(req, res);
}

// GET /login
function getLogin(req, res) {
  res.render('user/login', { message: req.flash('errorMessage') });
}

// POST /login
function postLogin(req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}



module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  profile: profile,
  userPublic: userPublic
};
