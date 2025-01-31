// Importing the Category , Item and Sub-Category Model
const category = require('../models/Category')
const subCategory = require('../models/SubCategory')
const items  = require('../models/Items')
const mongoose = require('mongoose');
const isValidObjectId = mongoose.Types.ObjectId.isValid;


// create items
exports.createItems = async(req,res) => {
    try {
        const {categoryName,subCategoryName,name,image,description,taxApplicability,tax,baseAmount,discount} = req.body
        
        // Check whether the Item is pre existing
        if(await items.findOne({name:name})) return res.status(401).json({message:"Item already exists"})
        
        // Check whether the category is pre existing
        const Category = await category.findOne({name:categoryName})
        if(!Category) return res.status(402).json({message:"No category found"})
        console.log(Category);

        // Check whether the sub category is pre existing
        const SubCategory = await subCategory.findOne({name:subCategoryName})
        if(!SubCategory) return res.status(402).json({message:"No sub-category found"})
        console.log(SubCategory);

        const totalAmount = baseAmount - discount;
        
        // if not new item is created
        const newItem = new items({
            categoryID:Category._id,
            categoryName,
            subCategoryID:SubCategory._id,
            subCategoryName,
            name,
            image,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount,
            totalAmount
        })

        // Save to database
        await newItem.save()
        return res.status(200).json({message:"Created Item"})

    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"Failed to create Items"})
    }
}


// get all items
exports.getAllItems = async(req,res) => {
    try {
        // Retrieve all items from the database
        const allItems = await items.find()

        // Check if items are found
        if (!allItems.length) {
            return res.status(404).json({ message: "No items found", data: [] });
        }

        return res.status(200).json({message:"Fetched all Items",data:allItems})
    } catch (error) {
        res.status(400).json("Failed to get all Items")
        console.error(error);
    }
}


// get all items by category
exports.getAllItemsByCategory = async(req,res) => {
    try {
        const {category} = req.params

        // Retrieve all Items by category from the database
        const allItemsByCategory = await items.find({categoryName:category})

        // Check if items are found
        if (!allItemsByCategory.length) {
            return res.status(404).json({ message: "No Items found", data: [] });
        }

        return res.status(200).json({message:"Fetched all items",data:allItemsByCategory})
    } catch (error) {
        res.status(400).json("Failed to get all Items")
        console.error(error);
    }
}


// get all items by sub category
exports.getAllItemsBySubCategory = async(req,res) => {
    try {
        const {subcategory} = req.params
        
        // Retrieve all Items by sub category from the database
        const allItemsBySubCategory = await items.find({subCategoryName:subcategory})

        // Check if items are found
        if (!allItemsBySubCategory.length) {
            return res.status(404).json({ message: "No Items found", data: [] });
        }

        return res.status(200).json({message:"Fetched all items",data:allItemsBySubCategory})
    } catch (error) {
        res.status(400).json("Failed to get all Items")
        console.error(error);
    }
}


// get item
exports.getItem = async(req,res) => {
    try {
        const { identifier } = req.params;

        let query;

        // Check if the 'identifier' is a valid ObjectId using isValidObjectId function
        if (isValidObjectId(identifier)) {
            query = { _id: identifier };
        } else {
            query = { name: identifier };
        }

        // Fetch the Item
        const item = await items.findOne(query)
        console.log(item)
        
        // If no Item is found,
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json({
            message:"Fetched Item",
            data:item
        })

    } catch (error) {
        res.status(400).json("Failed to get Item")
        console.error(error);
    }
}


// edit Items
exports.editItems = async(req,res) => {
    try {
        const {name,image,description,taxApplicability,tax,baseAmount,discount} = req.body
        const {id} = req.params

        const totalAmount = baseAmount - discount
    
        // Update the item fields with the new data,
        const updateItems = await items.findByIdAndUpdate(
            {_id:id},
            {
                ...(name && {name:name}),
                ...(image && {image}),
                ...(description && {description}),
                ...(taxApplicability !== undefined && { taxApplicability }), 
                ...(tax !== undefined && { tax }), 
                ...(baseAmount !== undefined && { baseAmount }), 
                ...(discount !== undefined && { discount }), 
                ...(totalAmount !== undefined && { totalAmount }),
            },
            {new:true}
        )
        
        // Check if there is an item existing
        if(!updateItems) return res.status(404).json({message:"no item found"})

        return res.status(200).json({message:"Item updated successfully",data:updateItems})
        
    } catch (error) {
        res.status(500).json("Failed to edit Item")
        console.error(error);
    }
}


// search by name
exports.searchByName = async(req,res) => {
    try {
        const {name} = req.params

        // Search for items in the 'items' collection
        // $regex is used for a case-insensitive search 
        const itemFound = await items.find({
            name:{$regex:new RegExp(name,"i")}
        })

        // If no items are found
        if(itemFound.length === 0) return res.status(404).json({message:"Item not Found"})

        return res.status(200).json({
            message:"Item Found",
            data:itemFound
        })
    } catch (error) {
        res.status(500).json("Failed to search Item")
        console.error(error);
    }
}