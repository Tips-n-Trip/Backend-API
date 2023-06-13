const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/UserController');

router.get('/profile', auth.authenticateToken, UserController.profile);

module.exports = router;
