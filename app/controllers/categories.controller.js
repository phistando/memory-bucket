var User = require('mongoose').model('User'),
    Photo = require('mongoose').model('Photo'),
    Category = require('mongoose').model('Category'),
    passport = require("passport");

    // GET /events
    function getEvents(req, res) {
      res.render('category/events', { message: req.flash('errorMessage') });
    }

    // GET /food
    function getFood(req, res) {
      res.render('category/food', { message: req.flash('errorMessage') });
    }

    // GET /general
    function getGeneral(req, res) {
      res.render('category/general', { message: req.flash('errorMessage') });
    }

    // GET /people
    function getPeople(req, res) {
      res.render('category/people', { message: req.flash('errorMessage') });
    }

    // GET /places
    function getPlaces(req, res) {
      res.render('category/places', { message: req.flash('errorMessage') });
    }

    // GET /random
    function getRandom(req, res) {
      res.render('category/random', { message: req.flash('errorMessage') });
    }


    module.exports = {

      getEvents: getEvents,
      getFood: getFood,
      getGeneral: getGeneral,
      getPeople: getPeople,
      getPlaces: getPlaces,
      getRandom: getRandom

    };
