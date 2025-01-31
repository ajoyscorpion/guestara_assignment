// Importing required modules
const express = require("express")

// Importing controllers for category, sub-category, and item-related routes
const categoryController = require("../controller/categoryController")
const subCategoryController = require("../controller/subCategoryController")
const itemsController = require("../controller/itemsController")

// express router to handle the routes
const router = express.Router()

// category route
router.post('/createCategory',categoryController.createCategory)
router.get('/allCategory',categoryController.getAllCategory)
router.get('/getCategory/:identifier',categoryController.getCategory)
router.put('/editCategory/:id',categoryController.editCategory)

// sub category route
router.post('/createSubCategory',subCategoryController.createSubCategory)
router.get('/allSubCategory',subCategoryController.getAllSubCategory)
router.get('/getSubCategoryByCategory/:category',subCategoryController.getAllSubCategoryByCategory)
router.get('/getSubCategory/:identifier',subCategoryController.getSubCategory)
router.put('/editSubCategory/:id',subCategoryController.editSubCategory)

// Item route
router.post('/createItem',itemsController.createItems)
router.get("/allItems",itemsController.getAllItems)
router.get("/allItemsByCategory/:category",itemsController.getAllItemsByCategory)
router.get("/allItemsBySubCategory/:subcategory",itemsController.getAllItemsBySubCategory)
router.get("/getItem/:identifier",itemsController.getItem)
router.put("/editItem/:id",itemsController.editItems)
router.get("/searchItem/:name",itemsController.searchByName)

// Exporting the router to use in the main server file
module.exports = router