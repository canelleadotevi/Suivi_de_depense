var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController')
var category = require('../controllers/CategoryController')
var isAuthenticated = require('../middleware/authentification')
const multer = require("multer");
const { storage } = require("../filesystem");
const upload = require('../uploads')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getAllCategories', category.getAllCategories);
router.post('/createCategory',category.createCategory);
router.post('/updateCategory/:categoryId', category.updateCategory)
router.post('/addBudgetToCategory/:categoryId', category.addBudgetToCategory)
router.post('/createDefaultCategories/:userId',category.createDefaultCategories)
router.post('/deleteCategory/:categoryId',category.deleteCategory)
router.get('/findCategory/:categoryId',category.findCategory)
router.get('/finalBudget/:categoryId',category.finalBudget)
module.exports = router;
