const express = require('express');

const assetsController = require('../controllers/assetsControllers');

const router = express.Router({ mergeParams: true });

router.get('/user/:userId', assetsController.getAssetsByUserId);

module.exports = router;
