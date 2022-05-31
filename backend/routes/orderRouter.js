const express = require("express")
const { createOrder, allOrders, unitOrders, userOrders, updateOrders } = require("../controllers/orderController")
const { isAuth, isAdmin } = require("../middleware/auth")
const router = express.Router()

router.route("/order/new/:id").post(isAuth,createOrder);
router.route("/order/all").get(isAuth,isAdmin,allOrders)
router.route("/order/unitall/:product").get(isAuth,isAdmin,unitOrders)
router.route("/order/userall/:user").get(isAuth,isAdmin,userOrders)
router.route("/order/update/:product").put(isAuth,isAdmin,updateOrders)

module.exports=router;