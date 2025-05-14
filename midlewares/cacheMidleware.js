const NodeCache = require('node-cache');
const cache = new NodeCache(); // Instância do NodeCache

// Cores para console.log
const cores = {
  verde: '\x1b[32m',
  vermelho: '\x1b[31m',
  amarelo: '\x1b[33m',
  azul: '\x1b[34m', 
  magenta: '\x1b[35m',
  reset: '\x1b[0m'
};

// Middleware de caching
function caching(req, res, next) {
    const chave = req.originalUrl.split('/')[1]; // Usando a URL como chave de cache
    const dadosCache = cache.get(chave);

    //Se houver dados no cache, retorna os dados do cache
    if (dadosCache !== undefined && req.method === 'GET') {
        console.log(`${cores.verde}Dados recuperados do cache para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
        return res.json(dadosCache); // Retorna os dados do cache
    }

    console.log(`${cores.vermelho}Dados não encontrados no cache para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
    // Se não estiver no cache, armazena a resposta original
    const originalSend = res.json.bind(res);
    res.json = (body) => {
        cache.set(chave, body, 30); // Armazena a resposta no cache
        originalSend(body); // Continua enviando a resposta original
        console.log(`${cores.azul}Armazenando no cache${cores.reset}`);
    };

    next();
}

function deleteCache(req, res) {
    const chave = req.originalUrl.split('/')[1]; // Usando a URL como chave de cache
    if(cache.has(chave) === false) {
        console.log(`${cores.verde}Cache não encontrado para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
        return res; 
    }
    // Se for um método que altera dados e já houver cache, invalida o cache
    cache.del(chave); // Remove o cache associado à URL
    console.log(`${cores.magenta}Cache removido para a URL: ${cores.amarelo}${chave}${cores.reset}`);
    return res; // Continua para o próximo middleware ou controlador
}

module.exports = { caching, deleteCache };