const sendToken = (user,statusCode,res)=>{
    const token = user.generateToken();


    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000 
        ),
        httpOnly:true
    }
    user.password=null
    res.status(statusCode).cookie("jwt",token,options).json({
        success:true,
        user,
        token
    })
}
module.exports = sendToken;