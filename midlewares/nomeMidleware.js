const validacaoNome = (request , response, next) => {
    const {body} = request;
    console.log(body);
    if(body.nome == undefined) {
        return response.status(400).json({ message : "O campo Nome e obrigatorio" });
    }

    if(body.nome.trim() === '') {
        return response.status(400).json({ message : "O campo nome nao pode ser vazio" });
    }
    if(body.nome.length < 3|| body.nome.length > 50) {
        return response.status(400).json({ message : "O campo nome deve ter entre 3 e 50 caracteres" });
    }
    next();
};

module.exports = {
    validacaoNome
};