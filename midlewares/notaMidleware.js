const validacaoNota = (request , response, next) => {
    const {body} = request;
    if(body.n1 == undefined) {
        return response.status(400).json({ message : "O campo n1 e obrigatorio" });
    }

    if(parseFloat(body.n1) < 0 || parseFloat(body.n1) > 10) {
        return response.status(400).json({ message : "O campo n1 tem que ser positivo e maior que 10" });
    }
    if(body.n1.length < 3|| body.n1.length > 50) {
        return response.status(400).json({ message : "O campo nome deve ter entre 3 e 50 caracteres" });
    }
    next();
};

module.exports = {
    validacaoNota
};