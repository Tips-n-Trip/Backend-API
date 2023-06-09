const express = require('express');
const router = express.Router();
const IteneraryController = require('../controllers/IteneraryController');
const validator = require('../middleware/validator');
const auth = require('../middleware/auth');

router.post('/',
    auth.authenticateToken,
    validator.validate,
    IteneraryController.generate);

router.get('/list', (req, res, next) => {
  res.send('Halaman Daftar Itenerary');
});

module.exports = router;
