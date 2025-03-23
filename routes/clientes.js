var express = require('express');
var router = express.Router();
const clientesController = require('../controllers/clienteController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const sobrenomeMidleware = require('../midlewares/sobrenomeMidleware');
const idadeMidleware = require('../midlewares/idadeMidleware');

/* GET clientes listing. */
router.get('/', clientesController.findAll);
/* POST clientes listing. */
router.post('/', nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.save);
/* PUT clientes listing. */
router.put('/', nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.update);
/* DELETE clientes listing. */
router.delete('/:id', clientesController.remove);



module.exports = router;