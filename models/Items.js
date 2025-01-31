// mongoose to define the schema
const mongoose = require("mongoose")

// schema for the Item model
const itemsSchema = mongoose.Schema({
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    subCategoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    subCategoryName:{
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
    },
    baseAmount:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default: 0
    },
    totalAmount:{
        type:Number
    }
})

// export the Item model
module.exports = mongoose.model("Items",itemsSchema)