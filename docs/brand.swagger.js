/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management endpoints
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of brands
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/brands/{brand_id}:
 *   get:
 *     summary: Get a specific brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: brand_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand found
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/brands/{brand_id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: brand_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/brands/{brand_id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: brand_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       401:
 *         description: Unauthorized
 */
