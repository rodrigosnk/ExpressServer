var express = require('express');
var router = express.Router();
const logoutController = require('../controllers/logoutController');
const verifyJWTMidleware = require('../midlewares/verifyJWTMidlleware');

// o metodo precisa invalidar o token do usuario para que ele nao consiga acessar mais os recursos protegidos
router.put('/', verifyJWTMidleware.verifyJWT, logoutController.update);

module.exports = router;