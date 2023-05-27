var express = require('express');
var router = express.Router();

router.get('/',(req,res) => {
    res.send('Halaman Register')
})

module.exports = router;