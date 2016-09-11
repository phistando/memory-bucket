var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/user.model');
  require('../app/models/category.model');
  require('../app/models/photo.model');
  require('../app/models/comment.model');
  return db;
};
