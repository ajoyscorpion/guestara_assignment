// Importing the Category and Sub-Category Model
const subCategory = require('../models/SubCategory')
const Category = require('../models/Category')
const mongoose = require('mongoose');
const isValidObjectId = mongoose.Types.ObjectId.isValid;


// Create Sub Category
exports.createSubCategory = async(req,res) => {
    try {
        const {categoryName,name,image,description,taxApplicability,tax} = req.body

        // Check whether the sub category is pre existing
        if(await subCategory.findOne({name:name})) return res.status(401).json({message:"Sub-Category already exists"})

        const category = await Category.findOne({name:categoryName})
        if (!category) return res.status(404).json({ message: "Category not found" });

        // if not new sub category is created
        const newSubCategory = new subCategory ({
            categoryID:category._id,
            categoryName,
            name,
            image,
            description,
            taxApplicability,
            tax
        })

        // Save to database
        await newSubCategory.save()
        res.status(200).json({message:"Created Sub-Category"})
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"Failed to create sub-category"})
    }
}


// Get all sub category
exports.getAllSubCategory = async(req,res) => {
    try {
        // Retrieve all sub categories from the database
        const allSubCategory = await subCategory.find()

        // Check if sub categories are found
        if (!allSubCategory.length) {
            return res.status(404).json({ message: "No sub-categories found", data: [] });
        }

        return res.status(200).json({message:"Fetched all SubCategories",data:allSubCategory})
    } catch (error) {
        res.status(400).json("Failed to get all sub-category")
        console.error(error);
    }
}


// Get all sub category by category
exports.getAllSubCategoryByCategory = async(req,res) => {
    try {
        const {category} = req.params

        // Retrieve all sub categories by category from the database
        const allSubCategoryByCategory = await subCategory.find({categoryName:category})

         // Check if sub categories are found
        if (!allSubCategoryByCategory.length) {
            return res.status(404).json({ message: "No sub-categories found", data: [] });
        }

        return res.status(200).json({message:"Fetched all SubCategories",data:allSubCategoryByCategory})
    } catch (error) {
        res.status(400).json("Failed to get all sub-category")
        console.error(error);
    }
}


// get sub category
exports.getSubCategory = async(req,res) => {
    try {
        const { identifier } = req.params;

        let query;

        // Check if the 'identifier' is a valid ObjectId using isValidObjectId function
        if (isValidObjectId(identifier)) {
            query = { _id: identifier };
        } else {
            query = { name: identifier };
        }

        // Fetch the Sub category
        const subcategory = await subCategory.findOne(query)
        
        // If no sub category is found,
        if (!subcategory) {
            return res.status(404).json({ message: "Sub-Category not found" });
        }

        return res.status(200).json({
            message:"Fetched sub-category",
            data:subcategory
        })

    } catch (error) {
        res.status(400).json("Failed to get sub-category")
        console.error(error);
    }
}


// edit sub category
exports.editSubCategory = async(req,res) => {
    try {

        const {name,image,description,taxApplicability,tax} = req.body
        const {id} = req.params

        // Update the sub category fields with the new data,
        const updateSubCategory = await subCategory.findByIdAndUpdate(
            {_id:id},
            {
                ...(name && { name: name }),
                ...(image && { image }),
                ...(description && { description }),
                ...(taxApplicability !== undefined && { taxApplicability }),
                ...(tax !== undefined && { tax }),
            },
            { new:true }
        )
        
        // Check if there is a sub category existing
        if(!updateSubCategory) return res.status(404).json({ message: 'No Sub Category Found' });
        
        return res.status(200).json({ message: "Category updated successfully", data: updateSubCategory });

    } catch (error) {
        res.status(500).json("Failed to edit sub-category")
        console.error(error);
    }
}