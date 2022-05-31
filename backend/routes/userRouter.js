const express = require('express')
const router = express.Router();
const { createUser, loginUser, logout,forgot, reset, userDetails, updatePassword, updateUserDetails, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuth, isAdmin } = require('../middleware/auth')

router.route('/register').post(createUser);

router.route('/login').post(loginUser)

router.route('/logout').get(logout)

router.route('/password/forgot').post(forgot)

router.route('/password/reset/:token').put(reset)

router.route('/user').get(userDetails)

router.route('/password/change').put(isAuth,updatePassword)

router.route('/user/update').put(isAuth,updateUserDetails)

// admin routers

router.route('/admin/user/all').get(isAuth,isAdmin,getAllUser)

router.route('/admin/user/:id').get(isAuth,isAdmin,getSingleUser)

router.route('/admin/user/update/:id').put(isAuth,isAdmin,updateUserRole)

router.route('/admin/user/delete/:id').delete(isAuth,isAdmin,deleteUser)


module.exports=router;