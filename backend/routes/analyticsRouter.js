const express = require("express")
const { dashboard } = require("../controllers/analyticsController")
const { isAuth, isAdmin } = require("../middleware/auth")
const router = express.Router()

router.route('/admin/dashboard').get(isAuth,isAdmin,dashboard)

module.exports=router