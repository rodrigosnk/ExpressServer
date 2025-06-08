var express = require('express');
var router = express.Router();

// o metodo precisa invalidar o token do usuario para que ele nao consiga acessar mais os recursos protegidos
router.post('/', function(req, res,) {
    // Aqui você pode adicionar a lógica para invalidar o token do usuário
    // Por exemplo, removendo o token do banco de dados ou marcando-o como inválido
    
    // Retorna uma resposta de sucesso
    res.json({ message: 'Usuário deslogado com sucesso.' });
});

module.exports = router;