const express = require('express');
const app = express();
const product = require('./routes/productRouter');
const user = require('./routes/userRouter');
const order = require('./routes/orderRouter');
const category = require('./routes/categoryRouter');
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload')

const errorMiddleware = require("./middleware/err")

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',category)

app.use(errorMiddleware)

module.exports = app;