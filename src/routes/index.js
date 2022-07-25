const express = require('express');

const usersRouter = require('./usersRouter');
const assetsRouter = require('./assetsRouter');
const signRouter = require('./signRouter');
const transactionsRouter = require('./transactionsRouter');
const accountRouter = require('./accountRouter');

const validateAndRefreshJWT = require('../middlewares/authMiddlewares/validateAndRefreshJWT');

const router = express.Router({ mergeParams: true });

router.use('/users', usersRouter);
router.use('/ativos', validateAndRefreshJWT, assetsRouter);
router.use('/sign', signRouter);
router.use('/investimentos', validateAndRefreshJWT, transactionsRouter);
router.use('/conta', accountRouter);

module.exports = router;
