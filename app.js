var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var about = require('./routes/about');
var support = require('./routes/support');
var career = require('./routes/career');
var faq = require('./routes/faq');
var faql = require('./routes/faql');
var features = require('./routes/features');
var career_protech = require('./routes/career_protech');
var how_it_works = require('./routes/how_it_works');
var pricing = require('./routes/pricing');
var portfolio = require('./routes/portfolio');
var apply_job = require('./routes/apply_job');
var contact = require('./routes/contact');
var privacy_policy = require('./routes/privacy_policy');
var typography = require('./routes/typography');
var components = require('./routes/components');
var blog_grid = require('./routes/blog_grid');
var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users );
app.use('/login', login);
app.use('/register', register);
app.use('/about', about);
app.use('/support', support);
app.use('/career', career);
app.use('/faq', faq);
app.use('/faql', faql);
app.use('/features', features);
app.use('/career-protech', career_protech);
app.use('/hot-it-works', how_it_works);
app.use('/pricing', pricing);
app.use('/portfolio', portfolio);
app.use('/apply-job', apply_job);
app.use('/contact', contact);
app.use('/privacy-policy', privacy_policy);
app.use('/typography', typography);
app.use('/components', components);
app.use('/blog-grid', blog_grid);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Nor found");
  err.status(404);
  next(err);
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
