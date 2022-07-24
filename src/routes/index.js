const express = require('express');

const usersRouter = require('./usersRouter');
const assetsRouter = require('./assetsRouter');
const signRouter = require('./signRouter');

const validateAndRefreshJWT = require('../middlewares/authMiddlewares/validateAndRefreshJWT');

const router = express.Router({ mergeParams: true });

router.use('/users', usersRouter);
router.use('/ativos', validateAndRefreshJWT, assetsRouter);
router.use('/sign', signRouter);

module.exports = router;
