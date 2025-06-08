var jwt = require('jsonwebtoken');

const secret = 'rodrigosnk';

// Middleware para verificar o token JWT
const verifyJWT = (req, res, next) => {
    // Obtém o token do cabeçalho de autorização
    const token = req.headers['authorization'];
    
    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }
    // Verifica se o token é válido
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: 'Token inválido.' });
        }
        
        // Se o token for válido, armazena os dados decodificados na requisição
        req.user = decoded;
        next();
    });
};

module.exports = { verifyJWT };