var express = require('express');
var router = express.Router();
const clientesController = require('../controllers/clienteController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const sobrenomeMidleware = require('../midlewares/sobrenomeMidleware');
const idadeMidleware = require('../midlewares/idadeMidleware');
const cacheMidleware = require('../midlewares/cacheMidleware');

/* GET clientes listing. */
router.get('/', cacheMidleware.caching, clientesController.findAll);
/* POST clientes listing. */
router.post('/',cacheMidleware.deleteCache, nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.save);
/* PUT clientes listing. */
router.put('/',cacheMidleware.deleteCache, nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.update);
/* DELETE clientes listing. */
router.delete('/:id',cacheMidleware.deleteCache, clientesController.remove);



module.exports = router;