require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var destinationsRouter = require('./routes/destinations');
var attractionsRouter = require('./routes/attractions');
var souvenirsRouter = require('./routes/souvenirs');
var itenerariesRouter = require('./routes/iteneraries');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// User Route
app.use('/register', registerRouter);
app.use('/login', loginRouter)

// Main Feature Route
app.use('/destinations', destinationsRouter);
app.use('/attractions', attractionsRouter);
app.use('/souvenirs', souvenirsRouter);
app.use('/iteneraries',itenerariesRouter);

module.exports = app;
