const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErr = require("../middleware/asyncErr");

// create order
exports.createOrder = asyncErr(async(req,res,next)=>{
    const{shiping,productInfo,bill} = req.body;
    let productId = req.params.id;
    const order = await Order.create({
        shiping:shiping,
        productId: productId,
        productInfo:productInfo,
        bill:bill,
        user:req.user._id,
        createdAt:Date.now(),
        status:"proccessing"
    }) ;

    res.status(201).json({
        success:true,
        order
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
    if(order.status === "shipped"){
        return next(new ErrorHandler("order already shipped",400))
    }
    order.status=req.body.status;
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
})