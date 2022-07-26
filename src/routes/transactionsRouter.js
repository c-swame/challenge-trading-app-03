const express = require('express');

const transactionsController = require('../controllers/transactionsControllers');

const router = express.Router({ mergeParams: true });

// !!!!!!!!! falta verificar se o token da pessoa compradora é o mesmo do codClient da requisição
router.post('/comprar', transactionsController.buyAssets);
router.post('/vender', transactionsController.sellAssets);

module.exports = router;
