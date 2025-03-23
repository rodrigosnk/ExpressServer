const connection = require('../configs/dbConfiguration');

const getCurrentDateTime = () => {
    return new Date();
};

const findAll = async () => {
    const produto = await (await connection).execute('SELECT * FROM produtos');
    return produto[0];
};

const update = async (produto) => {
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?';
    const isOK = await(await connection).execute(query, [produto.nome, produto.descricao, produto.preco, getCurrentDateTime(), produto.id]);
    return isOK[0].affectedRows === 1;
};

const save = async (produto) => {
    const query = 'INSERT INTO produtos(nome,  descricao, preco, data_atualizado) VALUES(?, ?, ?, ?)';
    const isOk = await(await connection).execute(query, [produto.nome, produto.descricao, produto.preco, getCurrentDateTime()]);
    return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
    const query = 'DELETE FROM produtos WHERE id = ?';
    const isOk = await(await connection).execute(query, [id]);
    return isOk[0].affectedRows === 1;
};

module.exports = {
    findAll,
    update,
    save,
    remove
};