var express = require('express');
const mysql = require('mysql2/promise');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  mysql.createConnection({
    host: 'localhost' ,
    user : 'adminBackend',
    password: 'adminadmin',
    database: 'backend_crud',
    port: 3306
  })
  .then((connection) => {
      connection.query('SELECT * FROM alunos;')
      .then((resultado) => {
          res.send(resultado[0]);
        });
      });

  //res.render('index', { title: 'Trabalho backend' });
});

module.exports = router;
