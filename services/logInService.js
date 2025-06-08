const connection = require('../configs/dbConfiguration');

const findUser = async (usuario) => {
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND senha = ?';
    const [result] = await (await connection).execute(query, [usuario.user, usuario.password]);
    return result[0];
};

const update = async (usuario) => {
    const query = 'UPDATE usuarios SET token = ? WHERE usuario = ?';
    const isOK = await (await connection).execute(query, [usuario.token, usuario.user]);
    return isOK[0].affectedRows === 1;
};

module.exports = { findUser, update };