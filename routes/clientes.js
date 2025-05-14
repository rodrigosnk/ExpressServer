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
router.post('/', nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.save, cacheMidleware.deleteCache);
/* PUT clientes listing. */
router.put('/' ,nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.update, cacheMidleware.deleteCache);
/* DELETE clientes listing. */
router.delete('/:id', clientesController.remove, cacheMidleware.deleteCache);



module.exports = router;