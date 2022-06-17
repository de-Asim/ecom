const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:[true,"Please enter the category name"],
        unique:[true,"Category already exists"]
    },
    img:{
        type:String,
        required:[true,"Please upload the image"],
    },
    frontpage:{
        type:String,
        required:true
    }
})

const CategoryModel = new mongoose.model("Category",categorySchema)

module.exports=CategoryModel