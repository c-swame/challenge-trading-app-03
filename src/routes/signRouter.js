const express = require('express');

const signControllers = require('../controllers/signControllers');

const router = express.Router({ mergeParams: true });

router.post('/up', signControllers.postNewUser);

module.exports = router;
