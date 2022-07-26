const express = require('express');

const assetsController = require('../controllers/assetsControllers');

const validateAdminOrOwnerPermission = require(
  '../middlewares/authMiddlewares/validateAdminOrOwnerPermissions',
);

const router = express.Router({ mergeParams: true });

router.get('/clientes/:userId', validateAdminOrOwnerPermission, assetsController.getAssetsByUserId);
router.get('/:assetId', assetsController.getAssetsById);

module.exports = router;
