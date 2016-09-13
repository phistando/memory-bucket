var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Category = require('mongoose').model('Category'),
    passport = require("passport");

    // GET /events
    function getEvents(req, res) {

      Category.findOne({category_type: 'Events'},
      function (err, category) {
        if (err) res.render("/profile", {message:
        req.flash('errorMessage')});

        Photo.find({category_id: category}, function (err, photos) {
          res.render("category/events", {message:
          req.flash('errorMessage'), user: req.user, photos: photos});

        });
      });
    }

    // GET /food
    function getFood(req, res) {

      Category.findOne({category_type: 'Food'},
      function (err, category) {
        if (err) res.render("/profile", {message:
        req.flash('errorMessage')});

        Photo.find({category_id: category}, function (err, photos) {
          res.render("category/food", {message:
          req.flash('errorMessage'), user: req.user, photos: photos});

        });
      });
    }

    // GET /general
    function getGeneral(req, res) {

      Photo.find()
        .exec(function (err, photos) {
          res.render('category/general', { message: req.flash('errorMessage'), user: req.user, photos: photos});
        });

    }

    // GET /people
    function getPeople(req, res) {

    Category.findOne({category_type: 'People'},
      function (err, category) {
        if (err) res.render("/profile", {message:
        req.flash('errorMessage')});

        Photo.find({category_id: category}, function (err, photos) {
          res.render("category/people", {message:
          req.flash('errorMessage'), user: req.user, photos: photos});

        });
      });

    }

    // GET /places
    function getPlaces(req, res) {

      Category.findOne({category_type: 'Places'}, function (err, category) {
        if (err) res.render("/profile", {message: req.flash('errorMessage')});

        Photo.find({category_id: category}, function (err, photos) {
          res.render("category/places", {message: req.flash('errorMessage'), user: req.user, photos: photos});
        });
      });
    }

    // GET /random
    function getRandom(req, res) {

      Category.findOne({category_type: 'Random'},
      function (err, category) {
        if (err) res.render("/profile", {message:
        req.flash('errorMessage')});

        Photo.find({category_id: category}, function (err, photos) {
          res.render("category/random", {message:
          req.flash('errorMessage'), user: req.user, photos: photos});

        });
      });
     }


    module.exports = {

      getEvents: getEvents,
      getFood: getFood,
      getGeneral: getGeneral,
      getPeople: getPeople,
      getPlaces: getPlaces,
      getRandom: getRandom

    };
