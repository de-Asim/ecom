const express = require("express")
const { createCategory, getAllCategories, frontPageCategories } = require("../controllers/categoryController")
const { isAuth, isAdmin } = require("../middleware/auth")
const router = express.Router()

router.route('/category/new').post(isAuth,isAdmin,createCategory)
router.route('/categories').get(getAllCategories)
router.route('/frontpagecategories').get(frontPageCategories)

module.exports=router