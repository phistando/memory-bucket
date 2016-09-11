// var jwt_secret = 'somerandomsuperlongpasswordthatnooneknows';


var express = require('express'),
    config = require('./config'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    cookieParser = require('cookie-Parser'),
    ejsLayouts = require('express-ejs-layouts'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');



module.exports = function() {
  var app = express();

  // initialize the required module
  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  }else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());


  // Setup middleware
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(ejsLayouts);

  // use express.session() before passport.session() to ensure that the login session is restored in the correct order
  app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
  // passport.initialize() middleware is required to initialize Passport.
  app.use(passport.initialize());
  // If your application uses persistent login sessions, passport.session()
  app.use(passport.session());
  app.use(flash());
  app.use(methodOverride(function(request, response) {
    if(request.body && typeof request.body === 'object' && '_method' in request.body) {
      var method = request.body._method;
      delete request.body._method;
      return method;
    }
  }));

  // Express settings
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static('./public'));

  require('./passport')(passport);

  // Custom middleware to allow global access to currentUser variable
  app.use(function(req, res, next) {
    global.currentUser = req.user;
    next();
  });



  require('../app/routes/index.server.routes')(app);

  require('../app/routes/users.routes')(app);
  require('../app/routes/photos.routes')(app);
  require('../app/routes/comments.routes')(app);
  require('../app/routes/categories.routes')(app);


  return app;

};
