const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const addProduct = async (req, res) => {
    try {
        const payload = {
            product_id: uuidv4(),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
            image_url: req.body.image_url,
            brand_id: req.body.brand_id || null,
            stock_quantity: req.body.stock_quantity ?? 0
        };
        await db('products').insert(payload);

        const newProduct = await db('products').where('product_id', payload.product_id).first();

        return res.status(201).json({
            message: 'Product added successfully',
            newProduct: newProduct
        })
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const getProduct = async (req, res) => {
    try {
        const product = await db('products').select('*');

        return res.status(200).json({
            message: 'Product retrieved successfully',
            product: product
        })
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id;

        const products = await db('products').where('product_id', product_id).first();
        if (!products) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({
            message: 'Product retrieved successfully',
            product: products
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateProduct = async (req, res) => {
    try {

        const product_id = req.params.product_id;

        const payload = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount_price: req.body.discount_price,
            category_id: req.body.category_id,
            image_url: req.body.image_url,
            brand_id: req.body.brand_id,
            stock_quantity: req.body.stock_quantity
        }

        const product = await db('products').where({ product_id: product_id }).first();

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await db('products').where({ product_id }).update(payload);

        return res.status(200).json({
            message: "Product Successfully Updated",
            updatedProduct: payload
        });

    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product_id = req.params.product_id;

        const product = await db('products').where({ product_id: product_id }).first();
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await db('products').where({ product_id }).del();

        return res.status(200).json({
            message: "Product Successfully Deleted",
            deletedProduct: product
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    addProduct,
    getProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}