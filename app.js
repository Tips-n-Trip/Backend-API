require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// const {indexRouter, usersRouter} = require('./routes/routes');
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destination');
const attractionRoutes = require('./routes/attraction');
const souvenirRoutes = require('./routes/souvenir');
const userRoutes = require('./routes/user');
const iteneraryRoutes = require('./routes/itenerary');
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// User Authentication
app.use('/auth', authRoutes);

// User Routes
app.use('/user', userRoutes);

// Main Routes
app.use('/destination', destinationRoutes);
app.use('/attraction', attractionRoutes);
app.use('/souvenir', souvenirRoutes);
app.use('/itenerary', iteneraryRoutes);

module.exports = app;
