const NodeCache = require('node-cache');
const crypto = require('crypto');
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


function gerarEtag(data) {
    const conteudoString = JSON.stringify(data);
    return crypto.createHash('md5').update(conteudoString).digest('hex');
}

// Middleware de caching
function caching(req, res, next) {
    const chave = req.originalUrl.split('/')[1]; // Usando a URL como chave de cache
    const dadosCache = cache.get(chave);

    //Se houver dados no cache, retorna os dados do cache
    if (dadosCache !== undefined) {
        
        if(req.headers['if-none-match'] === dadosCache.etag) {
            console.log(`${cores.verde}Cache ainda e valido para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
            res.status(304).send(); // Retorna 304 Not Modified se o ETag for igual
            return;
        }
        console.log(`${cores.verde}Dados recuperados do cache para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
        return res.json(dadosCache.data); // Retorna os dados do cache se estiver desatualizado
    }

    console.log(`${cores.vermelho}Dados não encontrados no cache para a URL:${cores.reset} ${cores.amarelo}${chave}${cores.reset}`);
    // Se não estiver no cache, armazena a resposta original
    const originalSend = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode === 200) {
            const etag = `W/"${gerarEtag(body)}"`; // Gera um ETag compacto baseado no hash do corpo
            cache.set(chave, {data : body, etag}, 300); // Armazena a resposta no cache
            res.setHeader('ETag', etag); // Configura o cabeçalho ETag na resposta
            console.log(`${cores.azul}Armazenando no cache${cores.reset}`);
        } else {
            console.log(`${cores.vermelho}Resposta com erro não será cacheada (status: ${res.statusCode})${cores.reset}`);
        }
        originalSend(body);
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