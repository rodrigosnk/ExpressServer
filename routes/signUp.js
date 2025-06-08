var express = require('express');
var router = express.Router();

const signUpController = require('../controllers/signUpController');
const  validacaoSenha = require('../midlewares/passwordMidleware');

// O método POST é usado para enviar dados ao servidor, como informações de login.	
router.post('/', validacaoSenha.validacaoSenha, signUpController.signUp);

module.exports = router;