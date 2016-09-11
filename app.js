var express = require('./config/express');
var mongoose = require('./config/mongoose');
var flash = require('connect-flash');


var db = mongoose();
var app = express();






app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});

module.exports = app;
