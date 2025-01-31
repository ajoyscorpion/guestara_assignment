// Importing the Category model
const category = require("../models/Category")
const mongoose = require('mongoose');
const isValidObjectId = mongoose.Types.ObjectId.isValid;

// Create Category
exports.createCategory = async(req,res) => {
    try {
        const {name,image,description,taxApplicability,tax,baseAmount,discount,totalAmount} = req.body

        // Check whether the category is pre existing
        if (await category.findOne({name})) {
            return res.status(401).json({message:"Category already exists"})
        }

        // if not new category is created
        const newCategory = new category({
            name,image,description,taxApplicability,tax,baseAmount,discount,totalAmount
        });
        
        // Save to database
        await newCategory.save()
        return res.status(200).json({message:"Category Created"})

    } catch (error) {
        res.status(500).json("Failed to create category")
        console.error(error);
    }
}

// Get all Category
exports.getAllCategory = async(req,res) => {
    try {
        // Retrieve all categories from the database
        const allCategory = await category.find()

        // Check if categories are found
        if (!allCategory.length) {
            return res.status(404).json({ message: "No categories found", data: [] });
        }

        return res.status(200).json({message:"Fetched all Categories",data:allCategory})
    } catch (error) {
        res.status(500).json("Failed to get all category")
        console.error(error);
    }
}


// Get Category by ID or Name
exports.getCategory = async(req,res) => {
    try {
        
        const { identifier } = req.params;

        let query;

        // Check if the 'identifier' is a valid ObjectId using isValidObjectId function
        if (isValidObjectId(identifier)) {
            query = { _id: identifier };
        } else {
            query = { name: identifier };
        }

        // Fetch the category
        const fetchedCategory = await category.findOne(query)
        console.log(fetchedCategory);

        // If no category is found,
        if (!fetchedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Return the fetched category
        return res.status(200).json({
            message:"Fetched category",
            data:fetchedCategory
        })

    } catch (error) {
        res.status(500).json("Failed to get category")
        console.error(error);
    }
}


// Edit Category 
exports.editCategory = async(req,res) => {
    try {

        const {name,image,description,taxApplicability,tax,baseAmount,discount,totalAmount} = req.body
        const {id} = req.params

        const existCategory = await category.findOne({_id:id})
        
        // Check if there is a category existing
        if(!existCategory) return res.status(404).json({message:'No Category is Found'})
    
        // Update the category fields with the new data,
        existCategory.name = name || existCategory.name;
        existCategory.image = image || existCategory.image;
        existCategory.description = description || existCategory.description;
        existCategory.taxApplicability = taxApplicability ?? existCategory.taxApplicability;
        existCategory.tax = tax ?? existCategory.tax;
        existCategory.baseAmount = baseAmount ?? existCategory.baseAmount;
        existCategory.discount = discount ?? existCategory.discount;
        existCategory.totalAmount = totalAmount ?? existCategory.totalAmount;
        
        // Save the updated category
        await existCategory.save()
        return res.status(200).json({message:"Category Updated Successfully",data:existCategory})
        
    } catch (error) {
        res.status(500).json("Failed to edit category")
        console.error(error);
    }
}