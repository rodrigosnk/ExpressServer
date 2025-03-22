const validacaoSobrenome = (request , response, next) => {
    const {body} = request;
    if(body.sobrenome == undefined) {
        return response.status(400).json({ message : "O campo sobrenome e obrigatorio" });
    }

    if(body.sobrenome === '') {
        return response.status(400).json({ message : "O campo sobrenome nao pode ser vazio" });
    }

    if(body.sobrenome.length() < 3|| body.sobrenome.length() > 50) {
        return response.status(400).json({ message : "O campo sobrenome deve ter entre 3 e 50 caracteres" });
    }
    next();
};

module.exports = {
    validacaoSobrenome
};