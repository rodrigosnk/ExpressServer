const validacaoPreco = (request , response, next) => {
    const {body} = request;
    if(body.preco == undefined) {
        return response.status(400).json({ message : "O campo preco e obrigatorio" });
    }
    console.log(body.preco);
    if(body.preco.trim() === '') {
        return response.status(400).json({ message : "O campo preco nao pode ser vazio" });
    }
    if(parseFloat(body.preco) < 1) {
        return response.status(400).json({ message : "O campo preco tem que ser positivo e maior que 1" });
    }
    next();
};

module.exports = {
    validacaoPreco
};