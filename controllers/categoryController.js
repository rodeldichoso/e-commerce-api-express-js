const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');


/**
 * Handle Category Creation
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - Category name
 * @param {string} req.body.description - Category description
 * @param {string} req.body.image_url - URL of the category image
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Returns a JSON response with created category data and a success message
 */
const addCategory = async (req, res) => {
    try {
        const payload = {
            category_id: uuidv4(),
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url
        }

        await db('categories').insert(payload);

        return res.status(201).json({
            msg: 'Category created successfully',
            category: payload
        });

    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Something went wrong adding category" });
    }
}

/**
 * Handle fetching all categories
 * 
 * @param {Object} req - Express request object 
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Respond with a JSON object containing all categories
 */
const getCategories = async (req, res) => {
    try {
        const categories = await db('categories').select('*');
        return res.status(200).json({
            msg: 'Categories fetched successfully',
            categories
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Something went wrong fetching categories" });
    }
}


/**
 * Handle Retrieving single category
 * 
 * @param {Object} req = Express request object
 * @param {string} req.params.category_id - Category ID
 * @param {Object} res - Express response object
 * 
 */
const getOneCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const category = await db('categories').where({ category_id }).first();
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json({
            msg: "Categories founded",
            category
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Something went wrong fetching category" });
    }
}

/**
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.category_name - Categories update name
 * @param {string} req.body.description - Description update string
 * @param {string} req.body.image_url - Image URL update string
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Respond with a JSON object containing the result of Update
 */
const updateCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const payload = {
            name: req.body.category_name,
            description: req.body.description,
            image_url: req.body.image_url
        };
        const category = await db('categories').where({ category_id }).first();
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        const updated_category = await db('categories').where({ category_id }).update(payload);
        return res.status(200).json({
            msg: "Category updated",
            updated_category: payload
        });

    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Something went wrong updating category" });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const category = await db('categories').where({ category_id }).first();

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await db('categories').where({ category_id }).del();
        return res.status(200).json({
            msg: "Category deleted",
            deletedCategory: category
        });

    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Something went wrong deleting category" });
    }
}

const getAllProductsOfCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        const products = await db('products').where({ category_id }).select('*');

        if (products.length === 0) {
            return res.status(404).json({ error: "No products for this category yet" });
        }

        return res.status(200).json({
            msg: "Products of category",
            products: products
        })
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            error: "Something went wrong getting products of category"
        });
    }
}

module.exports = {
    addCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    getAllProductsOfCategory
}