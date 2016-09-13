var express = require('express'),
    config = require('./config'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    cookieParser = require('cookie-parser'),
    ejsLayouts = require('express-ejs-layouts'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    path = require('path');



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
  app.use(cookieParser());

  app.use(ejsLayouts);

  // use express.session() before passport.session() to ensure that the login session is restored in the correct order
  // Configure the 'session' middleware
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'
  }));

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

  //set the location of the public folder
 //from config folder go up one level and link to /app/public
 app.use(express.static(path.join(__dirname + '/../app/public')));

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
