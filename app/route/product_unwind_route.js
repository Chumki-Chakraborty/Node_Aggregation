const express=require('express')
const { AddProduct, AllProduct, Unwind_productdata } = require('../controller/product_unwind_Controller')

const productRoute=express.Router()

productRoute.post('/addproduct',AddProduct)
productRoute.get('/allproductdata',AllProduct)
productRoute.get('/unwind/productdata',Unwind_productdata)
module.exports=productRoute