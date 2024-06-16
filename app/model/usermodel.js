const mongoose=require('mongoose')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const schema=mongoose.Schema
const UserSchema=new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    department:[
        {
        name:{
          type:String,
          required:true  
        },
        location:{
            type:String,
            required:true
        }
    }
            
        
],
status:{
        type:String,
        default:1
    }
},{timestamps:true})

UserSchema.plugin(mongooseAggregatePaginate);
const UserModel=mongoose.model('user',UserSchema)
module.exports=UserModel