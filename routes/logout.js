var express = require('express');
var router = express.Router();

// escutando logout

router.post('/', function(req, res,) {
    res.end('Logout realizado com sucesso!');
});

module.exports = router;