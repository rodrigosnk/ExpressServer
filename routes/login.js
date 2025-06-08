var express = require('express');
var router = express.Router();
const validacaoSenha = require('../midlewares/passwordMidleware');
const loginController = require('../controllers/loginController');
const verifyJWTMidleware = require('../midlewares/verifyJWTMidlleware');

router.post('/', validacaoSenha.validacaoSenha, loginController.findUser);


// metodo get que retorna ola mundo somente para usuarios autenticados
router.get('/', verifyJWTMidleware.verifyJWT, function(req, res) {
  res.json({ message: 'Olá Mundo!' });
});

module.exports = router;