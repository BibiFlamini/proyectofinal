var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index');
var nota1Router = require('./routes/nota1');
var nota2Router = require('./routes/nota2');
var nota3Router = require('./routes/nota3');
var promocionesRouter = require('./routes/promociones');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/promociones');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'electricidadcuandotumemiras',
  resave: false,
  saveUninitialized: true
}));

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next ();
    } else {
      res.redirect('/admin/login')
    }
  } catch(error) {
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use('/', indexRouter);
app.use('/nota1', nota1Router);
app.use('/nota2', nota2Router);
app.use('/nota3', nota3Router);
app.use('/promociones', promocionesRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/promociones', secured, adminRouter);

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
