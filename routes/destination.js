const express = require('express');
const DestinationController = require('../controllers/DestinationController');
const router = express.Router();

router.get('/', DestinationController.index);
router.get('/:id', DestinationController.detail);

module.exports = router;
