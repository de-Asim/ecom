const express = require('express');
const app = express();
const product = require('./routes/productRouter');
const user = require('./routes/userRouter');
const order = require('./routes/orderRouter');
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

const errorMiddleware = require("./middleware/err")

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)

app.use(errorMiddleware)

module.exports = app;