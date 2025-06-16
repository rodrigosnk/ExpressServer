const loginService = require('../services/logInService');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET;

const findUser = async (req, res) => {
    // Valida a senha usando o middleware
    const usuario = await loginService.findUser(req.body);
    // Verifica se o usuário existe e se a senha está correta
    if (!usuario || usuario === undefined) {
        return res.status(404).json({auth: false, token: "", "[ERROR/SERVER]" : "Usuario e senha incorretos" });
    }

    // Gera um token JWT para o usuário
    const token = jwt.sign({ id: usuario.id }, secretKey, { expiresIn: 300 }); // O token expira em 5 minutos
    usuario.token = token;
    // Atualiza o token do usuário no banco de dados
    const isOK = await loginService.update(usuario);
    if (!isOK) {
        return res.status(500).json({auth: false, token: "", "[ERROR/SERVER]" : "Erro ao atualizar o token do usuário" });
    }
    // Retorna o token para o cliente
    return res.status(200).json({auth: true, token });
};


module.exports = {
    findUser
};