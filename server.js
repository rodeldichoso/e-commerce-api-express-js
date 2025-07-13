const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'A simple REST API for managing products, categories, and brands and more for e-commerce app',
        },
        servers: [
            {
                url: 'http://localhost:3000', // change this if using a diff port
            },
        ],
    },
    apis: ['./routes/*.js', './docs/*.js'], // or the correct path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.PORT || 3000;

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        return callback(null, true); // Accept any origin
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: "App is running" });
});

app.use('/api/auth', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
});