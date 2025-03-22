const validacaoNome = (request , response, next) => {
    const {body} = request;
    if(body.nome == undefined) {
        return response.status(400).json({ message : "O campo Nome e obrigatorio" });
    }

    if(body.nome === '') {
        return response.status(400).json({ message : "O campo nome nao pode ser vazio" });
    }
    if(body.nome.length() < 3|| body.nome.length() > 50) {
        return response.status(400).json({ message : "O campo nome deve ter entre 3 e 50 caracteres" });
    }
    next();
};

module.exports = {
    validacaoNome
};