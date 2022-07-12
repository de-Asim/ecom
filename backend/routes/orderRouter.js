const express = require("express")
const { createOrder, allOrders, unitOrders, userOrders, updateOrders, addAddress, removeAddress, getAllAddress, getAddress, myOrders, getOrderDetails } = require("../controllers/orderController");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuth, isAdmin } = require("../middleware/auth")
const router = express.Router()

// add Address
router.route("/order/address/add").post(isAuth,addAddress);
// remove Address
router.route("/order/address/remove").delete(isAuth,removeAddress);
// get All Address
router.route("/order/address/all").get(isAuth,getAllAddress);
// get one Address
router.route("/order/address/:id").get(isAuth,getAddress);
// create New Order
router.route("/order/new/").post(isAuth,createOrder);
// get all orders
router.route("/orders").get(isAuth,myOrders);
// get order Details
router.route("/order/details/:id").get(isAuth,getOrderDetails);
// get all orders --admin
router.route("/order/admin/all").get(isAuth,isAdmin,allOrders)
// get all orders of an item --admin
router.route("/order/admin/unitall/:product").get(isAuth,isAdmin,unitOrders)
// get all order of an user --admin
router.route("/order/admin/userall/:user").get(isAuth,isAdmin,userOrders)
// update order status --admin
router.route("/order/admin/update/:product").put(isAuth,isAdmin,updateOrders)
// payment
router.route("/payment/process").post(isAuth,processPayment)
router.route("/payment/stripeapikey").get(isAuth,sendStripeApiKey)

module.exports=router;