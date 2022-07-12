const mongoose = require("mongoose");
const User = require("./userModel");

const addressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true,
        unique:true
    },
    addresses:[{
        name:{
            type:String,
            required:[true,"please enter name"]
        },
        mobile:{
            type:Number,
            required:[true,"please enter mobile"]
        },
        country:{
            type:String,
            required:[true,"please enter country"]
        },
        state:{
            type:String,
            required:[true,"please enter state"]
        },
        city:{
            type:String,
            required:[true,"please enter city"]
        },
        PIN:{
            type:Number,
            required:[true,"please enter PIN"]
        },
        address:{
            type:String,
            required:[true,"please enter address"]
        },
        type:{
            type:String,
            required:[true,"please select address type"]
        }
    }]
})

const Address = new mongoose.model("Address",addressSchema)
module.exports=Address;