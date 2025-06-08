const connection = require('../configs/dbConfiguration');

const update = async (usuario) => {
    const query = 'UPDATE usuarios SET token = "" WHERE usuario = ?';
    const isOK = await(await connection).execute(query, [usuario.user]);
    return isOK[0].affectedRows === 1;
};

module.exports = { update };