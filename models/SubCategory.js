// mongoose to define the schema
const mongoose = require("mongoose")

// schema for the sub category model
const subCategorySchema = mongoose.Schema({
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    taxApplicability:{
        type:Boolean,
        required:true,
        default:false
    },
    tax:{
        type:Number,
    }
})

// export the sub category model
module.exports = mongoose.model("SubCategory",subCategorySchema)