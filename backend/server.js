const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/conn')

dotenv.config({path:"backend/config/config.env"});

// uncought error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err}`)
    console.log("Shutting down the server")
    process.exit(1)
})

connectDB();


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