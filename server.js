// Load environment variables from a .env file into process.env
// This allows for the use of sensitive data such as API keys or database credentials.
var dotenv = require('dotenv');
dotenv.config(); // Load environment variables

// Import necessary dependencies
const express = require('express');  // Web framework for building the API
const app = express();              // Initialize the Express application
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors');          // Middleware for enabling Cross-Origin Resource Sharing
const mysql = require('mysql2');       // MySQL client for interacting with the database
const { connectToDb } = require('./db/data-connections.js'); // Custom database connection function
const usersRoutes = require('./routes/users-routes.js');    // Routes for user-related API endpoints
const loginRoutes = require('./routes/login-routes.js');    // Routes for login-related API endpoints
const recipesRoutes = require('./routes/recipes-routes.js');  // Routes for recipe-related API endpoints

// Use middleware
app.use(cors());                          // Enable CORS for all routes
app.use(bodyParser.json());               // Parse incoming JSON requests into JavaScript objects

// Define route handlers
app.use('/users', usersRoutes);           // All /users routes will be handled by usersRoutes
app.use('/login', loginRoutes);           // All /login routes will be handled by loginRoutes
app.use('/recipes', recipesRoutes);         // All /recipe routes will be handled by recipeRoutes

// Set the server's listening port
const PORT = process.env.DB_PORT;

// Start the Express server and connect to the database
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log server startup
  await connectToDb(); // Connect to the database asynchronously when the server starts
});
