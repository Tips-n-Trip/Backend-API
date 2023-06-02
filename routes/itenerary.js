const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Halaman Generate');
});

router.get('/list', (req, res, next) => {
  res.send('Halaman Daftar Itenerary');
});

module.exports = router;
