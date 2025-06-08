const crypto = require('crypto');

// Middleware para validar a senha e retornar senha criptografada
const validacaoSenha = (request , response, next) => {
    const {body} = request;
    if(body.password == undefined) {
        return response.status(400).json({ message : "o campo senha e obrigatorio" });
    }
    if(body.password === '') {
        return response.status(400).json({ message : "O campo senha nao pode ser vazio" });
    }
    if(body.password.length < 6) {
        return response.status(400).json({ message : "O campo senha deve ter no minimo 6 caracteres" });
    }
    if(body.password.length > 20) {
        return response.status(400).json({ message : "O campo senha deve ter no maximo 20 caracteres" });
    }
    if(!/[A-Z]/.test(body.password)) {
        return response.status(400).json({ message : "O campo senha deve conter pelo menos uma letra maiuscula" });
    }
    if(!/[0-9]/.test(body.password)) {
        return response.status(400).json({ message : "O campo senha deve conter pelo menos um numero" });
    }
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(body.password)) {
        return response.status(400).json({ message : "O campo senha deve conter pelo menos um caractere especial" });
    }
    // Criptografa a senha
    body.password = crypto.createHash('sha256').update(body.password).digest('hex');
    request.body = body; // Atualiza o corpo da requisição com a senha criptografada
    next();
};

module.exports = { validacaoSenha };
