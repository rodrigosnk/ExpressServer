const validacaoDescricao = (request , response, next) => {
    const {body} = request;
    if(body.descricao == undefined) {
        return response.status(400).json({ message : "O campo descricao e obrigatorio" });
    }

    if(body.descricao.trim() === '') {
        return response.status(400).json({ message : "O campo descricao nao pode ser vazio" });
    }
    next();
};

module.exports = {
    validacaoDescricao
};