var express = require('express');
var router = express.Router();
const clientesController = require('../controllers/clienteController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const sobrenomeMidleware = require('../midlewares/sobrenomeMidleware');
const idadeMidleware = require('../midlewares/idadeMidleware');
const cacheMidleware = require('../midlewares/cacheMidleware');
const verifyTokenMidleware = require('../midlewares/verifyJWTMidlleware');

/* GET clientes listing. */
router.get('/', verifyTokenMidleware.verifyJWT, cacheMidleware.caching, clientesController.findAll);
/* POST clientes listing. */
router.post('/', verifyTokenMidleware.verifyJWT, nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.save, cacheMidleware.deleteCache);
/* PUT clientes listing. */
router.put('/', verifyTokenMidleware.verifyJWT, nomeMidleware.validacaoNome, sobrenomeMidleware.validacaoSobrenome, idadeMidleware.validacaoIdade, clientesController.update, cacheMidleware.deleteCache);
/* DELETE clientes listing. */
router.delete('/:id', verifyTokenMidleware.verifyJWT, clientesController.remove, cacheMidleware.deleteCache);



module.exports = router;