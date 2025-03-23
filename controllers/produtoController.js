//const { response } = require('../app');
const produtoService = require('../services/produtoService');

const findAll = async (request, response) => {
    const produto = await produtoService.findAll();
    return response.status(200).json(produto);
};

const save = async (request, response) => {
    const resultado = await produtoService.save(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao salvar produto"});
};

const update = async (request, response) => {
    const resultado = await produtoService.update(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao atualizar produto"});
};

const remove = async (request , response) => {
    const {id} = request.params;
    const resultado = await produtoService.remove(id);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao deletar produto"});
};

module.exports = {
    findAll,
    save,
    update,
    remove
};