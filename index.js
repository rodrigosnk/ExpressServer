const express = require('express')
 const app = express()
 const port = 3000
 app.post('/', function (req, res) {
   res.send('Obteve uma requisição POST')
   })
   app.get('/usuarios', function (req, res) {
   res.send('Obteve uma requisição GET em /usuarios')
   })
   app.put('/usuarios', function (req, res) {
   res.send('Obteve uma requisição PUT em /usuarios')
   })
   app.delete('/usuarios', function (req, res) {
   res.send('Obteve uma requisição DELETE em /usuarios')
   })
 app.listen(port, () => {
    console.log(`Aplicação exemplo rodando em http://localhost:${port}`)
 })