var express = require('express');
var router = express.Router();

// o metodo precisa invalidar o token do usuario para que ele nao consiga acessar mais os recursos protegidos
router.post('/', function(req, res,) {
    res.end('Logout realizado com sucesso!');
});

module.exports = router;