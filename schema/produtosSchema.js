const Joi = require('joi');

const successfulProdutoSchema = Joi.array().items(
    Joi.object({
        id: Joi.number().integer().positive().required(),
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        preco: Joi.number().precision(2).positive().required(),
        data_atualizado: Joi.date().iso().required(),
    })
);

module.exports = { successfulProdutoSchema };