const ProductModel=require('../model/product_model_unwind')

const AddProduct=async(req,res)=>{
    try{
        const{pname,price,catagory,size}=req.body
        const addproduct=new ProductModel({
            pname,price,catagory,size
        })
        const saveproduct=await addproduct.save()
        if(saveproduct){
            return res.status(200).json({
                message:'product data is saved',
                data:saveproduct
            })
        }
    }catch(error){
        return res.status(500).json({
            message:"error to add product data",
            error:error.message
        })
    }
}
 const AllProduct=async(req,res)=>{
    try{
        const getdata=await ProductModel.find()
        if(getdata){
            return res.status(200).json({
                message:'all product data get sucessfully',
                data:getdata,
                totaldata:getdata.length
            })
        }
    }catch(error){
        return res.status(500).json({
            message:"error to found product data",
            error:error.message
        })
    }
 }
 const Unwind_productdata=async(req,res)=>{
    try{
        const productdata=await ProductModel.aggregate([{$unwind:"$size"}])
        if(productdata){
            return res.status(200).json({
                message:"unwind works properly",
                data:productdata,
                totalcount:productdata.length
            })
        }
    }catch(error){
        return res.status(500).json({
            message:"error to work unwind",
            error:error.message
        })
    }
 }
module.exports={
    AddProduct,
    AllProduct,
    Unwind_productdata
}