const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controllers/TransactionController');

transactionRouter.get('/', transactionController.getTransaction)

transactionRouter.get('/monthYear', transactionController.getMonthYear)
transactionRouter.post('/', transactionController.postTransaction)
transactionRouter.put('/:id', transactionController.putTransaction)
transactionRouter.delete('/:id', transactionController.deleteTransaction)
module.exports = transactionRouter;
