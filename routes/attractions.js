var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
    res.send('Halaman Daftar Atraksi');
});

module.exports =  router;
