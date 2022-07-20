const app = require('./app')
const connectDB = require('./config/conn')
const cloudinary=require('cloudinary')

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"});
}

// uncought error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err}`)
    console.log("Shutting down the server")
    process.exit(1)
})

connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`)
});

// unhandled promise rejection 
process.on("unhandledRejection",(err)=>{
    console.log(err)
    console.log('shutting down the server')
    server.close(()=>{
        process.exit(1)
    })
})