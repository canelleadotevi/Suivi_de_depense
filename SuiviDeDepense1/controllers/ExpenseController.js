const Expense = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const { wording, date, cost, user_id, category_id } = req.body
    try {
        if (!wording || !date || !cost || !user_id || !category_id) {
            return res.status(400).json({ message: "Certaines données sont manquantes .Veuillez renseigner tous les champs" })
        } else {
            const newExpense = new Expense({
                wording: wording,
                date: date,
                cost: cost,
                user_id: user_id,
                category_id: category_id
            })
            await newExpense.save();
            return res.status(200).json({
                message: "Ajout de la dépense avec succès",
                expense: newExpense
            })
        }
    } catch (error) {
        console.log(error)
    }
}
exports.getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().lean();

        res.json(expenses);
        console.log("Contrôleur appelé");
    } catch (err) {
        res.status(500).json({ message: 'Erreur ' });
    }
}
exports.updateExpense = async (req, res) => {
    const expenseId = req.params.expenseId;
    const updateWording = req.body.wording
    const updateDate = req.body.date
    const updateCost = req.body.cost
    const updateCategoryId = req.body.category_id
    const updateUserId = req.body.user_id

    if (!updateWording || !updateDate || !updateCost || !updateCategoryId || !updateUserId || !expenseId) {
        return res.status(400).json({ message: 'Données manquantes' })
    }
    try {
        const updateExpense = await Expense.findOneAndUpdate(
            { _id: expenseId },
            {
                $set: {
                    wording: updateWording,
                    date: updateDate,
                    cost: updateCost,
                    categoryId: updateCategoryId,
                    userId: updateUserId
                }
            },
            { new: true }
        );
        if (!updateExpense) {
            return res.status(404).json({ message: 'Dépense non trouvé' });
        }

        res.status(200).json({
            message: 'Dépense mis à jour avec succès',
            updateExpense
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur' });
    }
}

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.expenseId;
    const expense = Expense.findById(expenseId)
    try {
        if (!expense) {
            res.status(404).json({
                message: " La dépense n'a pas été trouvée"
            })
        }
        else {
            await Expense.deleteOne({ _id: expenseId })
            res.status(200).json({
                message: "Dépense supprimée avec succès"
            })
        }
    }
    catch (err) {
        console.error("Erreur lors de la suppression de la dépense", err);
        res.status(500).json({ message: "Erreur du serveur " })
    }
}

exports.getExpensesByDateAndCategory = async (req, res) => {
        const { selectDate , selectCategory } = req.query
    try {

        let query = {};
        if (selectDate && selectCategory) {
            query = { date: selectDate, category_id: selectCategory };

        } else if (selectDate && !selectCategory) {
            query = { date: selectDate }
        } else if (selectCategory && !selectDate) {
            query = { category_id: selectCategory }
        } else {
            return res.status(400).json({ message: "veuillez choisir une option" })
        }
        const expenses = await Expense.find(query)
        if (expenses.length > 0) {
            return res.status(200).json({ expenses })
        } else {
            return res.status(404).json({ message: "Aucune dépense trouvée pour ces critères" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur " })
    }

}

