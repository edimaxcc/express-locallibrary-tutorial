let createError = require('http-errors');
let express = require('express');
let session = require('express-session');
let cookieSession = require('cookie-session');
let cookieParser = require('cookie-parser');
let bodyPaser = require('body-parser');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let path = require('path');
let logger = require('morgan');
let index = require('./routes/index');
let users = require('./routes/users');
let catalog = require('./routes/catalog');  //Import routes for "catalog" area of site
var flash = require('connect-flash');
var expressValidator = require('express-validator');

let app = express();

//Set up mongoose connection
let mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/labtest';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(expressValidator());  //this line to be addded
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Config Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Config Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// use routes
app.use('/', index);
app.use('/users', users);

app.use('/catalog', catalog);  // Add catalog routes to middleware chain.



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
