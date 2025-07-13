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

module.exports = {
    addProduct
}