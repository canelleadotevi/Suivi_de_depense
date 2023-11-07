var express = require('express');
var router = express.Router();
const expense = require('../controllers/ExpenseController')
router.post('/addExpense', expense.addExpense)
router.get('/getAllExpense', expense.getAllExpense)
router.post('/deleteExpense/:expenseId', expense.deleteExpense)
router.put('/updateExpense/:expenseId', expense.updateExpense)
router.get('/getExpensesByDateAndCategory', expense.getExpensesByDateAndCategory)
module.exports = router