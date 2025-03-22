const connection = require('../configs/dbConfiguration');

const findAll = async () => {
    const alunos = await (await connection).execute('SELECT * FROM alunos');
    return alunos[0];
};

const update = async (aluno) => {
    const query = 'UPDATE alunos SET nome = ?, sobrenome = ?, email = ?, n1 = ?, n2 = ?, n3 = ?, nfinal = ? WHERE id = ?';
    const isOK = await(await connection).execute(query, [aluno.nome, aluno.sobrenome, aluno.email, aluno.n1, aluno.n2, aluno.n3, aluno.nfinal, aluno.id]);
    return isOK[0].affectedRows === 1;
};

const save = async (aluno) => {
    const query = 'INSERT INTO alunos(nome,  sobrenome, email, n1, n2, n3, nfinal) VALUES(?, ?, ?, ?, ?, ?, ?)';
    const isOk = await(await connection).execute(query, [aluno.nome, aluno.sobrenome, aluno.email, aluno.n1, aluno.n2, aluno.n3, aluno.nfinal]);
    return isOk[0].affectedRows === 1;
};

const remove = async (id) => {
    const query = 'DELETE FROM alunos WHERE id = ?';
    const isOk = await(await connection).execute(query, [id]);
    return isOk[0].affectedRows === 1;
};

module.exports = {
    findAll,
    update,
    save,
    remove
};