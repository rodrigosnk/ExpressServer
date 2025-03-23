var express = require('express');
var router = express.Router();
const produtosController = require('../controllers/produtoController');
const nomeMidleware = require('../midlewares/nomeMidleware');
const precoMidleware = require('../midlewares/precoMidlleware');
const descricaoMidleware = require('../midlewares/descricaoMidlleware');

/* GET clientes listing. */
router.get('/', produtosController.findAll);
/* POST clientes listing. */
router.post('/', nomeMidleware.validacaoNome, precoMidleware.validacaoPreco, descricaoMidleware.validacaoDescricao, produtosController.save);
/* PUT clientes listing. */
router.put('/', nomeMidleware.validacaoNome, precoMidleware.validacaoPreco, descricaoMidleware.validacaoDescricao , produtosController.update);
/* DELETE clientes listing. */
router.delete('/:id', produtosController.remove);



module.exports = router;