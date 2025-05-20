var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


const secret = 'rodrigosnk';

// O método POST é usado para enviar dados ao servidor, como informações de login.	
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


// metodo get que retorna ola mundo somente para usuarios autenticados
router.get('/', function(req, res) {
  // Verifica se o token JWT foi fornecido no cabeçalho de autorização
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).end('Token não fornecido!');
  }
  // Verifica se o token JWT é válido
  jwt.verify(token, secret, function(err) {
    if (err) {
      return res.status(401).end('Token inválido!');
    }
    // Se o token for válido, retorna uma mensagem de boas-vindas
    res.json({ message: 'Olá, mundo!' });
  });
});

module.exports = router;