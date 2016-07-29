var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var User =require('./models/user');
var post =require('./models/post');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
/*
var initPassport = require('./passport/init');
initPassport(passport); 
*/

/*app.use('/users', users);*/
/************** Configuración de la estrategia*************************/
passport.serializeUser(function(user, done) {
  console.log('serializing user: ');console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log('deserializing user:',user);
    done(err, user);
  });
});
passport.use('local', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ 'username' :  username },
          function(err, user) {
            // In case of any error, return using the done method
            if (err)
              return done(err);
            // Username does not exist, log the error and redirect back
            if (!user){
              console.log('User Not Found with username '+username);
              return done(null, false, req.flash('message', 'User Not found.'));
            }
              console.log('usuario :'+ user);

            // User exists but wrong password, log the error
           if (!isValidPassword(user, password)){
              console.log('Invalid Password');
              return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }

            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);
          }
      );

    })
);

var isValidPassword = function(user, password){
    console.log('password1 :'+ password);
    console.log('password2 :'+  user.password);
  return bCrypt.compareSync(password, user.password);
};



/*passport.use(new LocalStrategy(User.authenticate()));*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//mongoose.connect('mongodb://localhost:27017/ejemplo1');

mongoose.connect('mongodb://ds031865.mlab.com:31865/ejemplo1');

//mongodb://<dbuser>:<dbpassword>@ds031865.mlab.com:31865/ejemplo1
app.use('/', routes);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('BD sin error ')
});



/***********************************************************************/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
