const express = require('express');

const usersRouter = require('./usersRouter');

const router = express.Router({ mergeParams: true });

router.use('/users', usersRouter);

module.exports = router;
