var User = require('mongoose').model('User'),
    passport = require("passport");


//Get /userbucketpage
// function userBucketPage(req, res) {
//   res.render('user/userBucketPage', { message: req.flash('errorMessage') });
// }



//Get /:user_id
function showUserBucket(req, res) {
  res.render('user/userBucketPage', { message: req.flash('erroMessage')});
}

function user_by_id(req, res, next, id) {
  User.findOne({_id: id}, function (err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
}










// GET /signup
function getSignup(req, res) {
  res.render('user/signup', { message: req.flash('errorMessage') });
}

// POST /signup
function postSignup(req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/:user_id",
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
    successRedirect: "/:user_id",
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
  // userBucketPage: userBucketPage
  showUserBucket: showUserBucket,
  user_by_id: user_by_id
};
