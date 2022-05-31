const express = require('express');
const { route } = require('../app');
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProduct, productReview, getReviews, deleteReviews } = require('../controllers/productController');
const { isAuth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.route("/product/new").post(isAuth,isAdmin,createProduct);

router.route("/product").get(getAllProducts);


router.route("/product/review/:id").put(isAuth,productReview)

router.route("/product/reviews").get(getReviews).delete(isAuth,isAdmin,deleteReviews)

router.route("/product/:id").put(isAuth,isAdmin,updateProduct).delete(isAuth,isAdmin,deleteProduct).get(getProduct);

module.exports = router;