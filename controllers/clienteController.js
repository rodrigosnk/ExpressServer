//const { response } = require('../app');
const clienteService = require('../services/clienteService');

const findAll = async (request, response) => {
    const cliente = await clienteService.findAll();
    return response.status(200).json(cliente);
};

const save = async (request, response) => {
    const resultado = await clienteService.save(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao salvar cliente"});
};

const update = async (request, response) => {
    const resultado = await clienteService.update(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao atualizar cliente"});
};

const remove = async (request , response) => {
    const {id} = request.params;
    const resultado = await clienteService.remove(id);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao deletar cliente"});
};

module.exports = {
    findAll,
    save,
    update,
    remove
};