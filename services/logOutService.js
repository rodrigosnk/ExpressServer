const connection = require('../configs/dbConfiguration');

const logOut = async (userData, token) => {
    const user = userData.user;

    // Verifica se o usuário existe
    const [dados] = await (await connection).execute('SELECT * FROM usuarios WHERE usuario = ?', [user]);
    if (dados.length === 0 || dados[0].token !== token) {
        throw new Error('Usuário não encontrado.');
    }
    //invalidar o token

    // remover o token do banco de dados
    const query = 'UPDATE usuarios SET token = ? WHERE usuario = ?';
    const result = await (await connection).execute(query, [null, user]);
    if (result[0].affectedRows === 0) {
        throw new Error('Erro ao deslogar usuário.');
    }

    return result[0].affectedRows === 1;
}

module.exports = { Login };