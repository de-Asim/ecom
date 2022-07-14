const asyncErr = require("../middleware/asyncErr");
const CategoryModel = require("../models/categoryModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.dashboard = asyncErr(async (req, res, next) => {
    const products = await Product.find()
    const order = await Order.find()
    const user = await User.find()

    let stock = 0
    products.forEach((item) => {
        stock += item.stock
    })
    const numOfProducts = products.length
    const numOfOrder = order.length
    const delivered = order.filter(item => item.status === 'Delivered')
    const numOfDelivered = delivered.length
    let amount=0
    delivered.forEach((e)=>{
        amount+=e.bill.total
    })
    const outOfStock = products.filter(item => item.stock === 0).length
    const inStock = numOfProducts - outOfStock
    const numOfUser = user.length

    const date2=new Date()
    const newUser = user.filter(item =>((date2-item.createdAt)/(1000 * 3600 * 24)<=30)).length
    const oldUser= numOfUser-newUser

    const categories = await CategoryModel.find()
    let categoryStock=[]
    categories.forEach((item)=>{
        categoryCount=products.filter((e)=>e.category===item.category).length
        categorySold=delivered.filter((e)=>e.productInfo.category===item.category).length
        categoryStock.push([item.category,categoryCount,categorySold])
    })
    res.status(200).json({
        numOfProducts,
        stock,
        numOfOrder,
        numOfDelivered,
        numOfUser,
        outOfStock,
        inStock,
        newUser,
        oldUser,
        categoryStock,
        amount
    })
})