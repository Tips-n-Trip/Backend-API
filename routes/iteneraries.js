var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
    res.send('Halaman Generate Itenerary')
});

router.get('/list',(req,res,next) => {
    res.send('Halaman Daftar Itenerary');
});

module.exports = router;