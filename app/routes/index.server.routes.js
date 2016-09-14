module.exports = function(app) {

  var staticController = require('../controllers/static.controller');

  // static page routes
  app.get('/', staticController.home);
 };
