const ErrorHandler = require('../utils/errorHandler')

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    // cast error
    if(err.name=="CastError"){
        const message = `resource not found invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }

    //monoose duplicate key error 
    if(err.code===11000){
        const message = `${Object.keys(err.keyValue)} already exitst.`
        err = new ErrorHandler(message,400);
    }
    if(err.name ==='tokenExpiredError'){
        const message = `Authentication expired . Please log in again`;
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        statusCode:err.statusCode,
        err:err.message
    })

    
}