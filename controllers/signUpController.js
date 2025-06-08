const signUpService = require('../services/signUpService');

const signUp = async (request, response) => {
    try {
        const result = await signUpService.signUp(request.body);
        console.log(result);
        if (result) {
            return response.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
        return response.status(400).json({ error: 'Falha ao cadastrar usuário.' });
    } catch (error) {
        console.error(error);
        if (error.message === 'Usuário já cadastrado.') {
            return response.status(409).json({ error: error.message });
        }
        return response.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {signUp};