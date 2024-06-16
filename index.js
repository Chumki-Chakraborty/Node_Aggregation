const express=require('express')

const app=express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dotenv=require('dotenv')
dotenv.config()
const mongodb_connection=require('./app/config/database')
mongodb_connection()
// route
const route=require('./app/route/Apiroute')
app.use(route)
// productRoute
const productRoute=require('./app/route/product_unwind_route')
app.use(productRoute)
const port=2222
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})