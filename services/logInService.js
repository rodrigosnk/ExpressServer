const connection = require('../configs/dbConfiguration');

const Login = async (userData) => {
    const { user, password } = userData;

    // Verifica se o usuário já existe
    const [existingUser] = await (await connection).execute('SELECT * FROM usuarios WHERE usuario = ?', [user]);
    if (existingUser.length > 0) {
        throw new Error('Usuário já cadastrado.');
    }

    // Insere o novo usuário no banco de dados
    const query = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
    const result = await (await connection).execute(query, [user, password]);

    return result[0].affectedRows === 1;
}

module.exports = { signUp };