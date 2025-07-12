const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');


/**
 * Add a new brand to the database
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.brand_name - Name of the brand
 * @param {string} req.body.logo_url - URL of the brand's logo
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const addBrand = async (req, res) => {
    try {
        const { brand_name, logo_url } = req.body;

        const uuid = uuidv4();
        const newBrand = await db('brands').insert({
            brand_id: uuid,
            brand_name,
            logo_url
        });

        return res.status(201).json({ brandId: uuid });
    }
    catch (error) {
        console.error("Error Inserting new Brand", error);
        return res.status(500).json({ message: "Error Inserting new Brand" });
    }
}

/**
 * Return all brands
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Respond with a JSON object containing all brands
 */
const getBrands = async (req, res) => {
    try {
        const brands = await db('brands').select('*');
        return res.status(200).json(brands);
    }
    catch (error) {
        console.error("Error fetching Brands", error);
        return res.status(500).json({ message: "Error fetching Brands" });
    }
}

/**
 * Get a single brand by ID
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.brandId - Brand ID passed as a route parameter
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with a JSON object containing the brand
 */
const getOneBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await db('brands').where('brand_id', brandId).first();
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        return res.status(200).json(brand);
    }
    catch (error) {
        console.error("Error fetching Brand", error);
        return res.status(500).json({ message: "Error fetching Brand" });
    }
}

/**
 * Handle Deleting of brand
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.brandId - Brand ID passed as a route parameter
 * @param {Object} res - Express response object
 * @return {Promise<void>} - Responds with a JSON object containing the result of the deletion
 */
const deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await db('brands').where('brand_id', brandId).first();
        if (!brand) {
            return res.status(404).json({
                error: "Brand not found" // Return a 404 error
            })
        }

        await db('brands').where({ 'brand_id': brandId }).del();

        return res.status(200).json({
            message: "Brand deleted successfully",
            deletedBrand: brand
        });
    }
    catch (error) {
        console.error("Error deleting Brand", error);
        return res.status(500).json({ message: "Error deleting Brand" });
    }
}

/**
 * Handle Editing Brand
 * 
 * @param {Object} req - Express request object
 * @param {string} req.params.brandId - Brand ID passed as a route parameter
 * @param {string} req.body.brand_name - Updated name of brand
 * @param {string} req.body.logo_url - Updated logo url of the brand
 * @param {Object} res - Express request object
 * @return {Promise<void>} - Respond with a JSON object containing the result of Update
 */
const updateBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const { brand_name, logo_url } = req.body;

        const brandQuery = await db('brands').where({ brand_id: brandId });
        if (!brand) {
            return res.status(404).json({ error: "Brand not found" });
        }

        await brandQuery.update({
            brand_name,
            logo_url
        });

        const updateBrand = await brandQuery.first();

        return res.status(200).json({
            message: "Brand updated successfully",
            updatedBrand: updateBrand
        });
    }
    catch (error) {
        console.error("Error updating Brand", error);
        return res.status(500).json({ message: "Error updating Brand" });
    }
}

module.exports = {
    addBrand,
    getBrands,
    getOneBrand,
    deleteBrand,
    updateBrand
};