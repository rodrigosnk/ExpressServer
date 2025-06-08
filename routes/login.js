var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const logInService = require('../services/logInService');
const validacaoSenha = require('../midlewares/passwordMidleware');
const verifyJWT = require('../midlewares/verifyJWTMidlleware');

const secret = 'rodrigosnk';

// O método POST é usado para enviar dados ao servidor, como informações de login.	
router.post('/', function(req, res) {
  // Valida a senha usando o middleware
  validacaoSenha.validacaoSenha(req, res, async function() {
    try {
      // Cria um token JWT com os dados do usuário
      const token = jwt.sign({ user: 1 }, secret, { expiresIn: 300 });
      // Chama o serviço de login para verificar as credenciais do usuário
      const userData = await logInService.login(req.body, token);
      if (!userData) {
        return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
      }

      // Retorna o token para o cliente
      return res.json({ auth: true, token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Usuário ou senha incorretos.' });
    }
  });
});


// metodo get que retorna ola mundo somente para usuarios autenticados
router.get('/', verifyJWT.verifyJWT, function(req, res) {
  res.json({ message: 'Olá Mundo!' });
});

module.exports = router;