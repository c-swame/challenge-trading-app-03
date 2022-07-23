const express = require('express');

const usersRouter = require('./usersRouter');
const assetsRouter = require('./assetsRouter')

const router = express.Router({ mergeParams: true });

router.use('/users', usersRouter);
router.use('/ativos', assetsRouter)

module.exports = router;
