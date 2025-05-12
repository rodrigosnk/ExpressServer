const NodeCache = require('node-cache');
const cache = new NodeCache(); // Instância do NodeCache

// Middleware de caching
function caching(req, res, next) {
    const chave = req.originalUrl.split('/')[1]; // Usando a URL como chave de cache
    const dadosCache = cache.get(chave);

    //Se houver dados no cache, retorna os dados do cache
    if (dadosCache !== undefined && req.method === 'GET') {
        console.log("Dados recuperados do cache para a URL:", chave);
        return res.json(dadosCache); // Retorna os dados do cache
    }

    console.log("Dados não encontrados no cache para a URL:", chave);
    // Se não estiver no cache, armazena a resposta original
    const originalSend = res.json.bind(res);
    res.json = (body) => {
        cache.set(chave, body, 30); // Armazena a resposta no cache
        originalSend(body); // Continua enviando a resposta original
        console.log("armazenando no cache");
    };

    next();
}
function deleteCache(req, res, next) {
    const chave = req.originalUrl.split('/')[1]; // Usando a URL como chave de cache
    if(cache.has(chave) === false) {
        return next(); 
    }
    // Se for um método que altera dados e já houver cache, invalida o cache
    cache.del(chave); // Remove o cache associado à URL
    console.log(`Cache removido para a URL: ${chave}`);
    next(); // Continua para o próximo middleware ou controlador
}

module.exports = { caching, deleteCache };