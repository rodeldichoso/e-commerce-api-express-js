# E-Commerce Backend API

This is a backend API for an e-commerce platform. It provides endpoints for managing products, categories, brands, and user authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd E-commerces
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your database configuration in `knexfile.js` and `config/db.js`.
5. Run database migrations:
   ```bash
   npx knex migrate:latest
   ```
6. Start the server:
   ```bash
   npm start
   ```

## Usage

The server runs on the configured port (default 3000). Use an API client like Postman or curl to interact with the endpoints.

## Authentication

- Most routes require authentication via a JWT token.
- Authentication is enforced using the `authenticateToken` middleware found in `middleware/authUser.js`.
- This middleware checks for a valid JWT token in the `Authorization` header.
- If the token is missing or invalid, access is denied with a 401 status.
- Obtain a token by registering and logging in.
- Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

## API Routes

### Auth Routes

| Method | Endpoint       | Description                  | Validation Middleware          |
|--------|----------------|------------------------------|-------------------------------|
| POST   | /register      | Register a new user           | `validateUserCreate`           |
| POST   | /login         | Login user and get token      | `validatedUserLogin`           |
| POST   | /refresh       | Refresh access token          | None                          |

### Product Routes

All product routes require authentication.

| Method | Endpoint           | Description                  | Validation Middleware          |
|--------|--------------------|------------------------------|-------------------------------|
| POST   | /products          | Add a new product             | `validateProductInputs`        |
| GET    | /products          | Get all products              | None                          |
| GET    | /products/:product_id | Get a single product by ID   | None                          |
| PUT    | /products/:product_id | Update a product by ID       | None                          |
| DELETE | /products/:product_id | Delete a product by ID       | None                          |

### Category Routes

All category routes require authentication.

| Method | Endpoint               | Description                      | Validation Middleware          |
|--------|------------------------|---------------------------------|-------------------------------|
| POST   | /categories            | Add a new category               | `validateCategoryInputs`       |
| GET    | /categories            | Get all categories               | None                          |
| GET    | /categories/:category_id | Get a single category by ID      | None                          |
| PUT    | /categories/:category_id | Update a category by ID          | None                          |
| DELETE | /categories/:category_id | Delete a category by ID          | None                          |
| GET    | /categories/:category_id/products | Get all products of a category | None                          |

### Brand Routes

All brand routes require authentication.

| Method | Endpoint           | Description                  | Validation Middleware          |
|--------|--------------------|------------------------------|-------------------------------|
| POST   | /brands            | Add a new brand               | `validateBrandInputs`          |
| GET    | /brands            | Get all brands                | None                          |
| GET    | /brands/:brand_id  | Get a single brand by ID      | None                          |
| PUT    | /brands/:brand_id  | Update a brand by ID          | None                          |
| DELETE | /brands/:brand_id  | Delete a brand by ID          | None                          |

## Middleware and Validation

- Authentication middleware (`authenticateToken`) protects most routes.
- Input validation middleware is applied on POST and PUT routes to ensure data integrity.
- Validation errors are handled and returned with appropriate messages.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
