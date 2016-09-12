module.exports = function(app) {
  var categoriesController = require('../controllers/categories.controller');
  var usersController   = require('../controllers/users.controller');
  var photosController = require('../controllers/photos.controller');

  // function authenticatedUser(req, res, next) {
  //   // If the user is authenticated, then we can continue with next
  //   // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
  //   if (req.isAuthenticated()) return next();
  //
  //   // Otherwise
  //   req.flash('errorMessage', 'Login to access!');
  //   return res.redirect('/login');
  // }
  //
  // function unAuthenticatedUser(req, res, next) {
  //   if (!req.isAuthenticated()) return next();
  //
  //   // Otherwise
  //   req.flash('errorMessage', 'You are already logged in!');
  //   return res.redirect('/');
  // }



  app.route("/events")
    .get( categoriesController.getEvents);

  app.route("/food")
    .get( categoriesController.getFood);

  app.route("/general")
    .get( categoriesController.getGeneral);

  app.route("/people")
    .get( categoriesController.getPeople);

  app.route("/places")
    .get( categoriesController.getPlaces);

    app.route("/random")
    .get( categoriesController.getRandom);


















 };
