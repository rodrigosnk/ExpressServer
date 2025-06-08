const connection = require('../configs/dbConfiguration');

const login = async (userData, token) => {
    const { user, password } = userData;

    // Verifica se o usuário existe e se a senha está correta
    const [dados] = await (await connection).execute('SELECT * FROM usuarios WHERE usuario = ?', [user]);
    if (dados.length === 0 || dados[0].senha !== password) {
        throw new Error('Usuário ou senha incorretos.');
    }

    // inserir o token no banco de dados
    const query = 'UPDATE usuarios SET token = ? WHERE usuario = ?';
    const result = await (await connection).execute(query, [token, user]);

    return result[0].affectedRows === 1;
}

module.exports = { login };