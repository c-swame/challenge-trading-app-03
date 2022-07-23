const express = require('express');

const appRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use(appRoutes);

app.get('/', (_req, resp) => resp.send('<p>Bem vindo à api trading app!!</p>'));

module.exports = app;
