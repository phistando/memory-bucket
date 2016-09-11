module.exports = function(app) {
  // MIDDLEWARE FOR ROUTING
  // var index = require('../controllers/index.server.controller');
  // var about = require('../controllers/about.server.controller');
  // var contact = require('../controllers/contact.server.controller');

  // COMBINE ALL CONTROLLERS INTO ONE
  var staticController = require('../controllers/static.controller');

  // ACTUAL ROUTING
  // static page routes
  app.get('/', staticController.home);
 };
