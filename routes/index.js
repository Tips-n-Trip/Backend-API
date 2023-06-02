const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    'success': true,
    'message': 'Halaman berhasil ditemukan',
    'data': {},
  });
});

module.exports = router;
