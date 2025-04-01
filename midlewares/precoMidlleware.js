const validacaoPreco = (request , response, next) => {
    const {body} = request;
    if(body.preco == undefined) {
        return response.status(400).json({ message : "O campo preco e obrigatorio" });
    }
    if(body.preco === '') {
        return response.status(400).json({ message : "O campo preco nao pode ser vazio" });
    }
    if(Number.isNaN(parseFloat(body.preco))) {
        return response.status(400).json({message : "O campo preco precisa ser um numero valido"})
    }
    if(parseFloat(body.preco) < 1) {
        return response.status(400).json({ message : "O campo preco tem que ser positivo e maior que 1" });
    }
    next();
};

module.exports = {
    validacaoPreco
};