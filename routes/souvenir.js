const express = require('express');
const router = express.Router();
const SouvenirController = require('../controllers/SouvenirController');

router.get('/', SouvenirController.index);
router.get('/detail/:id', SouvenirController.detail);

module.exports = router;
