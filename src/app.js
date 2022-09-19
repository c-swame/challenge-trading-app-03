const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/errorMiddleware/errorMiddleware.middleware');
const appRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use(appRoutes);

app.get('/', (_req, resp) => resp.send('<p>Bem vindo à api trading app!!</p>'));

app.use(errorMiddleware);

module.exports = app;
