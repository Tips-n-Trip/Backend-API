const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');
const validator = require('../middleware/validator');

router.get('/google',
    passport.authenticate('google',
        {scope: ['profile']}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
      res.redirect('/profile');
    });

router.post('/register', validator.store, AuthController.register);

router.post('/login', validator.authenticate, AuthController.login);

router.get('/logout', AuthController.logout);

module.exports = router;
