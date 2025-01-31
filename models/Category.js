// mongoose to define the schema
const mongoose = require("mongoose")

// schema for the Category model
const CategorySchema = mongoose.Schema({
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
        required:true
    },
    tax:{
        type:Number
    },
    baseAmount:{
        type:Number
    },
    discount:{
        type:Number
    },
    totalAmount:{
        type:Number
    }

})

// export the Category model
module.exports = mongoose.model('Category',CategorySchema)