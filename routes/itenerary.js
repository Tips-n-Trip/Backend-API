const express = require('express');
const router = express.Router();
const IteneraryController = require('../controllers/IteneraryController');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');

router.post('/',
    auth.authenticateToken,
    validator.validate,
    IteneraryController.generate);

router.get('/list', auth.authenticateToken, IteneraryController.list);

router.get('/save/:id', auth.authenticateToken, IteneraryController.save);

router.get('/delete/:id', auth.authenticateToken, IteneraryController.delete);

module.exports = router;
