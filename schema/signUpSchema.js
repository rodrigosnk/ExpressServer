const Joi = require('joi');

const errorSignUpSchema = Joi.object({
        error : Joi.string().required()
});

module.exports = { errorSignUpSchema };