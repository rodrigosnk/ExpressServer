var express = require('express');
var router = express.Router();
const alunoController = require('../controllers/alunoController');

/* GET alunos listing. */
router.get('/', alunoController.findAll);
/* POST alunos listing. */
router.post('/', alunoController.save);
/* PUT alunos listing. */
router.put('/', alunoController.update);
/* DELETE alunos listing. */
router.delete('/:id', alunoController.remove);



module.exports = router;
