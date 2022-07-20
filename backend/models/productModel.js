const mongoose = require('mongoose');
const User = require('./userModel');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"]
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"]
    },
    image:[{
        public_id:{
            type:String,
            required:true
        },
        source:{
            type:String,
            required:true
        }
    }],
    ratings:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the no of stocks"],
        default:1
    },
    ordered:{
        type:Number,
        default:0
    },
    delivered:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:User,
            required:true,
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }],
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    createTime:{
        type:Date,
        default:Date.now
    }
})

const Product = new mongoose.model("Product",productSchema);

module.exports = Product;