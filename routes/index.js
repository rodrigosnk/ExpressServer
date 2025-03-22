var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 
  res.send("ola mundo")
  //res.render('index', { title: 'Trabalho backend' });
});

module.exports = router;
