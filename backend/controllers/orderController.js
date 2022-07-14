const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErr = require("../middleware/asyncErr");
const Address = require("../models/addressModel");
const ApiFeature = require("../utils/apiFeatures");

// add address
exports.addAddress = asyncErr(async(req,res,next)=>{
    const user = req.user._id
    if(!user){
        return next(new ErrorHandler("please login",400))
    }
    const{name,address,city,state,country,PIN,mobile,type} = req.body;

    let isAddress = await Address.findOne({user})

    if(!isAddress){
        isAddress = await Address.create({
            user:user
        })
    }

    isAddress.addresses.push({
        name,
        mobile,
        country,
        state,
        city,
        PIN,
        address,
        type
    }) ;

    isAddress = await isAddress.save() 

    res.status(201).json({
        success:true,
        isAddress
    })
})

// remove address
exports.removeAddress = asyncErr(async(req,res,next)=>{
    const user = req.user._id
    if(!user){
        return next(new ErrorHandler("please login",400))
    }
    
    let isAddress = await Address.findOne({user})
    
    if(!isAddress){
        return next(new ErrorHandler("You don't have any saved addresses",404))
    }

    isAddress.addresses = isAddress.addresses.filter((e)=>
    e._id.toString().split(`"`)[0] !== req.query.id.toString())

    console.log(isAddress);

    isAddress = await isAddress.save() 

    res.status(201).json({
        success:true,
        isAddress
    })
})

// get all address
exports.getAllAddress = asyncErr(async(req,res,next)=>{
    const user = req.user._id
    if(!user){
        return next(new ErrorHandler("please login",400))
    }
    
    let isAddress = await Address.findOne({user})
    
    if(!isAddress){
        return next(new ErrorHandler("You don't have any saved addresses",404))
    }

    res.status(201).json({
        success:true,
        addresees:isAddress.addresses
    })
})
// get address
exports.getAddress = asyncErr(async(req,res,next)=>{
    const user = req.user._id
    if(!user){
        return next(new ErrorHandler("please login",400))
    }
    
    let isAddress = await Address.findOne({user})
    
    if(!isAddress){
        return next(new ErrorHandler("You don't have any saved addresses",404))
    }
    const addressFilter = (e)=>{
        return e._id.toString().split(`"`)[0]===req.params.id.toString()
    }
    const address = isAddress.addresses.filter(addressFilter)
    
    if(address.length === 0){
        return next(new ErrorHandler("Please check your URL",404))
    }
    res.status(201).json({
        success:true,
        address:address[0]
    })
})

// create order
exports.createOrder = asyncErr(async(req,res,next)=>{
    const{id,name, address, city, state, country, PIN, mobile, type, productName,category, productImg, quantity, unitPrice, price, tax, total} = req.body;
    const order =await Order.create({
        shipping:{
            name,
            address,
            city,
            state,
            country,
            PIN,
            mobile,
            type
        },
        productId: id,
        productInfo:{
            productName,
            category,
            productImg,
            quantity,
            unitPrice,
        },
        bill:{
            price,
            tax,
            total
        },
        user:req.user._id,
        createdAt:Date.now(),
        status:"proccessing"
    });

    res.status(201).json({
        success:true,
        order
    })
})

// get all orders
exports.myOrders = asyncErr(async(req,res,next)=>{
    const ordersCount =await Order.find({user:req.user._id}).countDocuments()
    const apiFeature = new ApiFeature(Order.find({user:req.user._id}).sort({createdAt:-1}), req.query)
    .pagination(10)
  let orders = await apiFeature.query;
    if(!orders){
        return next(new ErrorHandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        ordersCount,
        orders
    })
})

// get order details
exports.getOrderDetails = asyncErr(async(req,res,next)=>{
    const user=req.user
    if(!user){
        return next(new ErrorHandler("Please log in",404))
    }
    const orderDetails = await Order.findOne({_id:req.params.id,user:user._id})
    if(!orderDetails){
        return next(new ErrorHandler("Order not found",404))
    }
    res.status(200).json({
        success:true,
        orderDetails
    })
})

// chack all orders --admin
exports.allOrders = asyncErr(async(req,res,next)=>{
    const orders = await Order.find();
    if(!orders){
        return next(new ErrorHandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        orders
    })
})

// all orders of an item --admin
exports.unitOrders = asyncErr(async(req,res,next)=>{
    const orders = await Order.find({productId:req.params.product});
    if(!orders){
        return next(new ErrorHandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        orders
    })
})
// all orders of an user --admin
exports.userOrders = asyncErr(async(req,res,next)=>{
    const orders = await Order.find({user:req.params.user});
    if(!orders){
        return next(new ErrorHandler("order not found",404))
    }
    res.status(200).json({
        success:true,
        orders
    })
})
// order status update --admin
exports.updateOrders = asyncErr(async(req,res,next)=>{
    const order = await Order.findById(req.params.product);
    if(!order){
        return next(new ErrorHandler("order not found",404))
    }
    if(order.status === "Delivered"){
        return next(new ErrorHandler("Order already Delivered",400))
    }
    order.status=req.body.status;
    order.timeline.push({
        status:req.body.status
    })
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
})