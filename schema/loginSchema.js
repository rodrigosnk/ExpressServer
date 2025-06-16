const Joi = require('joi');
const successfulLoginSchema = Joi.object({
        auth : Joi.boolean().required(),
        token: Joi.string().required(),
});

const errorLoginSchema = Joi.object({
        auth : Joi.boolean().required(),
        token: Joi.string().allow('').required(),
        message: Joi.string().required(),
});

module.exports = { successfulLoginSchema, errorLoginSchema };