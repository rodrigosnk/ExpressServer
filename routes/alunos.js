var express = require('express');
var router = express.Router();
const alunoController = require('../controllers/alunoController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const sobrenomeMidleware = require('../midlewares/sobrenomeMidleware');
const notaMidleware = require('../midlewares/notaMidleware');

/* GET alunos listing. */
router.get('/', alunoController.findAll);
/* POST alunos listing. */
router.post('/', nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, notaMidleware.validacaoNota, alunoController.save);
/* PUT alunos listing. */
router.put('/', alunoController.update);
/* DELETE alunos listing. */
router.delete('/:id', alunoController.remove);



module.exports = router;
