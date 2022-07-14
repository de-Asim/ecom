const mongoose = require("mongoose");
const Product = require("./productModel");
const User = require('./userModel');

const orderSchema = new mongoose.Schema({
    shipping:
    {
        name: {
            type: String,
            required: [true, "please enter name"]
        },
        address: {
            type: String,
            required: [true, "please enter address"]
        },
        city: {
            type: String,
            required: [true, "please enter city"]
        },
        state: {
            type: String,
            required: [true, "please enter state"]
        },
        country: {
            type: String,
            required: [true, "please enter country"]
        },
        PIN: {
            type: Number,
            required: [true, "please enter PIN"]
        },
        mobile: {
            type: Number,
            required: [true, "please enter mobile"]
        },
        type: {
            type: String,
            required: [true, "please enter address type"]
        }
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    productInfo:
    {
        productName: {
            type: String,
            required: [true, "Product name not found"]
        },
        category: {
            type: String,
        },
        productImg: {
            type: String
        },
        quantity: {
            type: Number,
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        }

    },
    bill:
    {
        price: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }
    ,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    timeline: [{
        status: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default:new Date(Date.now())
        }
    }]

})

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;