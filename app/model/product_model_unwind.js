const mongoose=require('mongoose')

const schema=mongoose.Schema

const productSchema=new schema({
    pname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    size:{
        type:Array
        
    },
})
const productmodel=mongoose.model('product',productSchema)
module.exports=productmodel