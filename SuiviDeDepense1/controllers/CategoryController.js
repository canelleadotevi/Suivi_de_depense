const Category = require("../models/CategoryModel")
const Expense = require('../models/ExpenseModel')


/* exports.createCategory = async (req, res) => {
    try {
        const dataName = req.body.name;
        const dataImage = req.file; 

        if (!dataName || !dataImage) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        } else {
            const fileName = dataImage.filename;
            const data = {
                name: dataName,
                image: fileName,
                budget: null,
                user_id: null
            };

            const newData = new Category(data);
            await newData.save();

            res.status(200).json({
                message: 'Catégorie créée avec succès',
                category: newData,
            });
        }
    } catch (err) {
        console.error('Erreur lors de la création de la catégorie :', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
 */
exports.createCategory = async (req, res) => {
    try {
        const dataName = req.body.name;
        const dataUserId = req.body.user_id
        console.log('req.body', req.body.name)
        console.log("req.body.user_id")
        if (!dataName || !dataUserId) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }        const searchCategory = await Category.findOne({ name:dataName , user_id: dataUserId})
        if(searchCategory){
            return res.status(400).json({message: "la catégorie existe déjà"})
        }else{
            const data = {
                name: dataName,
                budget: null,
                user_id: dataUserId
            };
            const newData = new Category(data);
            await newData.save();
    
            res.status(200).json({
                message: 'Catégorie créée avec succès',
                category: newData,
            });
        }
       
    } catch (err) {
        console.error('Erreur lors de la création de la catégorie :', err);
        res.status(500).send({ message: 'Erreur ' });
    }
}
exports.updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const updateName = req.body.name;
    console.log('req.params.categoryId', req.params.categoryId)
    console.log('req.body.name', req.body.name)

    if (!updateName || !categoryId) {
        return res.status(400).json({ message: 'Données manquantes' })
    }
    try {
        const updateCategory = await Category.findOneAndUpdate(
            { _id: categoryId },
            {
                $set: {
                    name: updateName
                }
            },
            { new: true }
        );
        if (!updateCategory) {
            return res.status(404).json({ message: 'Catégorie non trouvé' });
        }

        res.status(200).json({
            message: 'Catégorie mis à jour avec succès',
            updateCategory
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Erreur ' });
    }
}

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = Category.findById(categoryId)
    try {
        if (!category) {
            res.status(404).json({
                message: " La catégorie n'a pas été trouvée"
            })
        }
        else {
            await Category.deleteOne({ _id: categoryId })
            res.status(200).json({
                message: "Catégorie supprimé avec succès"
            })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Erreur  " })
    }
}
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();

        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Erreur ' });
    }
}

exports.findCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "la catégorie n'a pas été trouvée." })

        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur " })
    }
}

exports.addBudgetToCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const updateBudget = req.body.budget;
    console.log('req.params.categoryId', req.params.categoryId)

    if (!updateBudget || !categoryId) {
        return res.status(400).json({ message: 'Données manquantes' })
    }
    try {
        const updateCategory = await Category.findOneAndUpdate(
            { _id: categoryId },
            {
                $set: {
                    budget: updateBudget
                }
            },
            { new: true }
        );
        if (!updateCategory) {
            return res.status(404).json({ message: 'Catégorie non trouvé' });
        }

        res.status(200).json({
            message: 'Ajout de budget à la catégorie effectuée  avec succès',
            updateCategory
        })
    }
    catch (err) {
        console.error('Erreur lors de  de l\'ajout de budget à la catégorie', err);
        res.status(500).json({ message: 'Erreur' });
    }
}

exports.finalBudget = async (req, res) => {

    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId)
        const categoryBudget = category.budget
        if (categoryBudget === null) {
            return res.status(201).json({ finalBudget: "0" })
        } else {
            let totalAmount = 0;
            const categoryExpenses = await Expense.find({ category_id: categoryId });
            if (categoryExpenses.length > 0) {
                categoryExpenses.forEach((expense) => {
                    totalAmount += expense.cost
                    if (categoryBudget > totalAmount) {
                        const finalBudget = categoryBudget - totalAmount;
                        return res.status(200).json({ finalBudget: finalBudget })
                    } else {
                        return res.status(400).json({ finalBudget: "Vous avez atteint le budget.Veuillez le mettre à jour"})
                    }
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ finalBudget: "Erreur" })
    }

}
exports.createDefaultCategories = async (req, res) => {
    try {
        const { defaultCategories } = req.body;
        const userId = req.params.userId;
    
        const existingCategories = await Category.find({ user_id: userId });
    
        const existingCategoryNames = existingCategories.map(cat => cat.name);
    
        const categoriesToCreate = defaultCategories.filter(cat => !existingCategoryNames.includes(cat.name));
    
        if (categoriesToCreate.length > 0) {
            const categories = categoriesToCreate.map(cat => ({ ...cat, user_id: userId }));
            const createdCategories = await Category.insertMany(categories);
            return res.status(201).json({ message: 'Catégories par défaut créées avec succès', categories: createdCategories });
        } else {
            return res.status(200).json({ message: 'L\'utilisateur a déjà des catégories.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
    
    
} 
/* exports.createDefaultCategories = async (req, res) => {
    try {
        const { defaultCategories } = req.body;
        const userId = req.params.userId;
        console.log('defaultCategories',defaultCategories)

        const existingCategories = await Category.find({ user_id: userId });
        console.log('existingCategories',existingCategories)

        if (existingCategories.length === 0) {
            const categories = defaultCategories.map(cat => ({ ...cat, user_id: userId }));
            const createdCategories = await Category.insertMany(categories);
            return res.status(201).json({ message: 'Catégories par défaut créées avec succès', categories: createdCategories });
        } else {
            return res.status(200).json({ message: 'Aucune nouvelle catégorie à créer' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
 */