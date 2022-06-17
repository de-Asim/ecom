const asyncErr = require("../middleware/asyncErr")
const Category = require("../models/categoryModel")

exports.createCategory= asyncErr(async(req,res,next)=>{
    const category = await Category.create(req.body)
    res.status(201).json({
        success:true,
        category
    })
})
exports.getAllCategories=asyncErr(async(req,res,next)=>{
    const AllCategories=await Category.find()
    res.status(200).json({
        success:true,
        AllCategories
    })
})
exports.frontPageCategories=asyncErr(async(req,res,next)=>{
    const categories=await Category.find({frontpage:true})
    res.status(200).json({
        success:true,
        categories
    })
})