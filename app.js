var express = require('./config/express');
var mongoose = require('./config/mongoose');
var flash = require('connect-flash');

var db = mongoose();
var app = express();


app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});

// console.log('AWS ACCESS KEY : ' +  '[' +  process.env.AWS_ACCESS_KEY_ID + ']' )
// console.log('AWS SECRET ACCESS KEY : ' +  '[' +  process.env.AWS_SECRET_ACCESS_KEY + ']' )
// console.log('S3 BUCKET : ' +  '[' +  process.env.S3_BUCKET + ']' )


module.exports = app;
