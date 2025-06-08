const { invalidateToken } = require('../midlewares/verifyJWTMidlleware');

const update = (req, res) => {
    try {
        const token = req.headers['authorization'];
        
        // Invalida o token atual
        const invalidated = invalidateToken(token);
        
        if (invalidated) {
            return res.status(200).json({ message: 'Logout realizado com sucesso' });
        } else {
            return res.status(500).json({ error: 'Erro ao realizar logout' });
        }
    } catch (error) {
        console.error('Erro no logout:', error);
        return res.status(500).json({ error: 'Erro interno ao processar logout' });
    }
};

module.exports = {
  update
};