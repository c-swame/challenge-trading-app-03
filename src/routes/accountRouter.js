const express = require('express');

const transactionsController = require('../controllers/transactionsControllers');
const usersController = require('../controllers/userControllers');

const router = express.Router({ mergeParams: true });

// !!!!!!!!! falta verificar se o token da pessoa compradora é o mesmo do codClient da requisição
router.post('/deposito', transactionsController.postDeposit);
router.post('/saque', transactionsController.postWithdraw);
router.get('/:codCliente', usersController.getUserByIdController);

module.exports = router;
