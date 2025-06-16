const Joi = require('joi');

const successfulClienteSchema = Joi.array().items(
    Joi.object({
        id: Joi.number().integer().positive().required(),
        nome: Joi.string().required(),
        sobrenome: Joi.string().required(),
        email: Joi.string().email().required(),
        idade: Joi.number().integer().positive().required()
    })
);

const errorClienteSchema = Joi.object({
        error: Joi.string().allow('').required()
});

module.exports = { successfulClienteSchema, errorClienteSchema };