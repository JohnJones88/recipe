var dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { connectToDb } = require('./db/data-connections.js')
const usersRoutes = require('./routes/users-routes.js');
const loginRoutes = require('./routes/login-routes.js');
const recipeRoutes = require('./routes/recipe-routes.js')

app.use(cors());
app.use(bodyParser.json())
app.use('/users', usersRoutes)
app.use('/login', loginRoutes)
app.use('/recipe', recipeRoutes)


const PORT = 3000
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    await connectToDb();
  })