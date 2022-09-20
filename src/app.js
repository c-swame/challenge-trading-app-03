const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const errorMiddleware = require('./middlewares/errorMiddleware/errorMiddleware.middleware');
const appRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(appRoutes);

app.get('/', (_req, resp) => resp.send('<p>Bem vindo à api trading app!!</p>'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

module.exports = app;
