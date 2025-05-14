var express = require('express');
var router = express.Router();
const produtosController = require('../controllers/produtoController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const precoMidleware = require('../midlewares/precoMidlleware');
const descricaoMidleware = require('../midlewares/descricaoMidlleware');
const cacheMidleware = require('../midlewares/cacheMidleware');

/* GET clientes listing. */
router.get('/', cacheMidleware.caching,  produtosController.findAll);
/* POST clientes listing. */
router.post('/', nomeMidleware.validacaoNome, precoMidleware.validacaoPreco, descricaoMidleware.validacaoDescricao, produtosController.save, cacheMidleware.deleteCache);
/* PUT clientes listing. */
router.put('/', nomeMidleware.validacaoNome, precoMidleware.validacaoPreco, descricaoMidleware.validacaoDescricao, produtosController.update, cacheMidleware.deleteCache);
/* DELETE clientes listing. */
router.delete('/:id', produtosController.remove, cacheMidleware.deleteCache);



module.exports = router;