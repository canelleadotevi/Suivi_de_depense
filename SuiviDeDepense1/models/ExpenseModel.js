const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    wording: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    }
})
const Expense = mongoose.model('expenses', ExpenseSchema ) ;

module.exports = Expense ;