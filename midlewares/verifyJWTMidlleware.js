var jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');

const secret = process.env.SECRET;
// Cache para armazenar tokens inválidos (blacklist)
const tokenBlacklist = new NodeCache();

// Middleware para verificar o token JWT
const verifyJWT = (req, res, next) => {
    // Obtém o token do cabeçalho de autorização
    let token = req.headers['authorization'];
    
    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    // Suporta o padrão 'Bearer <token>'
    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    // Verifica se o token está na blacklist
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ error: 'Token invalidado por logout.' });
    }

    // Verifica se o token é válido
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        
        // Se o token for válido, armazena os dados decodificados na requisição
        req.user = decoded;
        next();
    });
};

// Função para invalidar um token
const invalidateToken = (token) => {
    try {
        // Decodifica o token para obter a expiração
        const decoded = jwt.verify(token, secret);
        
        // Calcula quanto tempo falta para o token expirar (em segundos)
        const now = Math.floor(Date.now() / 1000);
        const ttl = decoded.exp ? (decoded.exp - now) : 3600; // 1h padrão se não houver exp
        
        // Adiciona o token à blacklist com TTL apropriado
        tokenBlacklist.set(token, true, ttl > 0 ? ttl : 0);
        return true;
    } catch (error) {
        console.error('Erro ao invalidar token:', error);
        return false;
    }
};

module.exports = { verifyJWT, invalidateToken };