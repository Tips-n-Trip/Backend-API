const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/AttractionController');

router.get('/', AttractionController.index);
router.get('/detail/:id', AttractionController.detail);

module.exports = router;
