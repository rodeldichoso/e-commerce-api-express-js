# E-commerce Backend API

## Description
This is a backend API for an E-commerce application built with Node.js. It uses Knex.js for database migrations and provides endpoints for authentication, brand management, and other e-commerce functionalities.

## Prerequisites
- Node.js (v14 or higher recommended)
- MySQL or compatible database
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rodeldichoso/e-commerce-api-express-js.git
   cd E-commerce
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables. See `.env.example` for reference.

## Environment Variables

| Variable              | Description                          | Example                      |
|-----------------------|----------------------------------|------------------------------|
| `PORT`                | Port number for the server         | `3000`                       |
| `DB_TYPE`             | Database client type (Knex)        | `mysql2`                     |
| `DB_HOST`             | Database host                      | `localhost`                  |
| `DB_USER`             | Database username                  | `root`                       |
| `DB_PASSWORD`         | Database password                  | `your_password`              |
| `DB_NAME`             | Database name                     | `e-commerce`                 |
| `JWT_SECRET_KEY`      | Secret key for JWT authentication | `your_jwt_secret_key`        |
| `JWT_EXPIRES_AT`      | JWT token expiration time          | `15m`                        |
| `REFRESH_JWT_SECRET_KEY` | Secret key for refresh tokens    | `your_refresh_jwt_secret_key`|
| `REFRESH_JWT_EXPIRES_AT` | Refresh token expiration time    | `7d`                         |
| `BCRYPT_SALT_ROUND`   | Salt rounds for bcrypt hashing     | `10`                        |
| `NODE_ENV`            | Node environment (development/production) | `development`          |
| `CORS_ORIGIN`         | Allowed CORS origin URL            | `http://127.0.0.1:5500`     |

## Database Setup

1. Configure your database connection in `config/db.js` or via environment variables.

2. Run database migrations using Knex:
   ```
   npx knex migrate:latest
   ```

3. To rollback the last batch of migrations:
   ```
   npx knex migrate:rollback
   ```

## Usage

Start the server:
```
node server.js
```

The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints Overview

- **Authentication**
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - Other auth-related endpoints in `controllers/authController.js` and `routes/authRoutes.js`

- **Brand Management**
  - `POST /brands` - Create a new brand
  - `GET /brands` - Get all brands
  - `GET /brands/:brand_id` - Get a single brand by ID
  - `PUT /brands/:brand_id` - Update a brand by ID
  - `DELETE /brands/:brand_id` - Delete a brand by ID
  - Defined in `controllers/brandController.js` and `routes/brandRoutes.js`

- **Category Management**
  - `POST /categories` - Create a new category
  - `GET /categories` - Get all categories
  - `GET /categories/:category_id` - Get a single category by ID
  - `PUT /categories/:category_id` - Update a category by ID
  - `DELETE /categories/:category_id` - Delete a category by ID
  - Defined in `controllers/categoryController` and `routes/categoryRoutes.js`

- Additional endpoints may exist for products, orders, reviews, etc., based on the migrations and controllers.

## Middleware

- Authentication middleware to protect routes (`middleware/authUser.js`)
- Input validation middleware (`middleware/validate.js` and `middleware/inputValidator/`), including:
  - Brand validation (`brandValidator.js`)
  - Category validation (`categoryValidator.js`)
  - Authentication validation (`authValidator.js`)

## Project Structure

- `controllers/` - Route handler logic
- `routes/` - API route definitions
- `middleware/` - Middleware for authentication and validation
- `config/` - Configuration files including database connection
- `migrations/` - Database migration files using Knex
- `server.js` - Application entry point
- `knexfile.js` - Knex configuration

## License

This project is licensed under the MIT License.

