var express = require('express');
var router = express.Router();

/* GET alunos listing. */
router.get('/', function(req, res,) {
  res.send('GET alunos');
});
/* POST alunos listing. */
router.post('/', function(req, res,) {
  res.send('POST alunos');
});
/* PUT alunos listing. */
router.put('/', function(req, res,) {
  res.send('PUT alunos');
});
/* DELETE alunos listing. */
router.delete('/', function(req, res,) {
  res.send('DELETE alunos');
});



module.exports = router;
