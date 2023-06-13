const express = require('express');
const DestinationController = require('../controllers/DestinationController');
const router = express.Router();

router.get('/', DestinationController.index);
router.get('/detail/:id', DestinationController.detail);

module.exports = router;
