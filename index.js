const express = require('express');

const app = express();

app.get('/' , function(req, res) {
    res.send("Ola mundo");
})

app.listen(3000, function() {
    console.log("servidor rodadando na porta 3000")
})