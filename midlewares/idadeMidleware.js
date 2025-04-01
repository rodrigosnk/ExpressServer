const validacaoIdade = (request , response, next) => {
    const {body} = request;
    if(body.idade == undefined) {
        return response.status(400).json({ message : "O campo idade e obrigatorio" });
    }
    if(body.idade === '') {
        return response.status(400).json({ message : "O campo idade nao pode ser vazio" });
    }
    if(Number.isNaN(parseFloat(body.idade))) {
        return response.status(400).json({message : "O campo idade precisa ser um numero valido"});
    }
    if(parseFloat(body.idade) < 1) {
        return response.status(400).json({ message : "O campo idade tem que ser positivo e maior que 1" });
    }
    next();
};

module.exports = {
    validacaoIdade
};