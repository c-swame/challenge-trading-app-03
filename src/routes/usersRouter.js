const express = require('express');

const usersControllers = require('../controllers/userControllers');

const router = express.Router({ mergeParams: true });

router.get('/', usersControllers.getAllUsersController);

module.exports = router;
