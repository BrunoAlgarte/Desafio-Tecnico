const express = require('express');
const mongoose = require('mongoose');
const server = express();

const funcionarioRouter = require('./routes/funcionarioRouter'); // Corrigido para caminho relativo

// Middleware para parsear URL-encoded e JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Rota para funcionários
server.use('/funcionario', funcionarioRouter);

// Credenciais do banco de dados
const DB_USER = 'brunoalgter';
const DB_PASSWORD = encodeURIComponent('Bruno123filedetilapia');

// Conexão com o MongoDB
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ar4lb8g.mongodb.net/`
)
    .then(() => {
        console.log('Conectado ao MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});
