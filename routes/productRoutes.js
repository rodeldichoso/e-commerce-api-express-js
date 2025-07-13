const express = require('express');
const router = express.Router();

const { validateProductInputs } = require('../middleware/inputValidator/productValidator');
const validated = require('../middleware/validate');
const { addProduct } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - brand_id
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               price:
 *                 type: number
 *               brand_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */

router.post('/', validateProductInputs, validated, addProduct);

module.exports = router;