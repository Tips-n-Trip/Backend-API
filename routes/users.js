let express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard',(req,res,next) => {
  res.send('Halaman Dashboard');
});

router.get('/:id',(req,res,next) => {
  res.send(`Halo user ${req.params.id}`);
});

module.exports = router;
