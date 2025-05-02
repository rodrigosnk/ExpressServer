var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const secret = 'rodrigosnk';

// escutando login
router.post('/', function(req, res,) {
  
  if (req.body.user === 'admin' && req.body.password === 'admin') {
    const token = jwt.sign({ id : 1}, secret, { expiresIn: 300 });
    // Se a autenticação for bem-sucedida, retorna o token JWT
    return res.json({ auth: true, token });
  } else {
    // Se a autenticação falhar, redireciona para a página de login com uma mensagem de erro
    res.status(401).end('Login ou senha inválidos!');
  }
});

module.exports = router;