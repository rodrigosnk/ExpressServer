//const { response } = require('../app');
const alunoService = require('../services/alunoService');

const findAll = async (request, response) => {
    const alunos = await alunoService.findAll();
    return response.status(200).json(alunos);
};

const save = async (request, response) => {
    const resultado = await alunoService.save(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao salvar aluno"});
};

const update = async (request, response) => {
    const resultado = await alunoService.update(request.body);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao atualizar aluno"});
};

const remove = async (request , response) => {
    const {id} = request.params;
    const resultado = await alunoService.remove(id);
    return resultado ? response.status(200).json() : response.status(400).json({"[ERROR/SERVER]" : "falha ao deletar aluno"});
};

module.exports = {
    findAll,
    save,
    update,
    remove
};