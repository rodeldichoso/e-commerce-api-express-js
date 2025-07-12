const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

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

app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);
});