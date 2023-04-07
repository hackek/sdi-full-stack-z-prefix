// Get needed dependencies
const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const cors=require("cors");
const knex = require('knex')(require('../knexfile.js')["development"]);

// Initialize useful variables
const app = express();
const port = 3001;

// Helps prevent request conflicts
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true
}))

// Initialize the session cookie for visitors
app.use(session({
  name: "current_session",
  secret: 'pokemon master',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

// Listen at the designated port for sending api call answers
app.listen(port, () => {})

// Setup express for the server
app.use(express.json());

// GET Requests:
// Get the total list of items
app.get('/', async (req, res) => {
  // Gets all items from the database
  await knex('items')
    .select('*')
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(400).json(
        {message: errorMessage}
      )
    )
})

// Get the list of existing users
app.get('/login', async (req, res) => {
  // Gets all users from the database
  await knex('users')
    .select('*')
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(400).json(
        {message: errorMessage}
      )
    )
})

// Get the detailed information of an item
app.get('/detail/:id', async (req, res) => {
  // Gets a specific item from the database
  await knex('items')
    .select('*')
    .where("id", "=", req.params.id)
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(400).json(
        {message: errorMessage}
      )
    )
})



// PATCH Requests:
// Edit a specific item
app.patch('/detail/:id', async(req, res) => {
  // Edits a specific item in the database
  await knex('items')
  .update(req.body)
  .where("id", "=", req.params.id)
  .then(data =>
    res.status(200).json(data)
  )
  .catch(err =>
    res.status(404).json(err)
  )
})


// POST Requests:
// Create a new item
app.post('/newitem', async (req, res) => {
  // Inserts the new item into the DB
  await knex('items')
    .insert(req.body)
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(404).json(err)
    );
})

// Create a user account or login to an existing one
app.post('/login', async (req, res) => {
  // Take the input username and password from the user's submission
  const { FirstName, LastName, Username, Password } = req.body[0];
  // Return an error if either the username or password were not filled out at all
  if (FirstName === "" || LastName === "" || Username === "" || Password === "") {
    return res.status(401).json({
      error: "Missing Name or Username or Password"
    });
  }
  // Search the database for a user with those credentials
  const data = await knex("users").where("Username", "ilike", Username);
  // If the user does not exist in the database, create a new one!
  if (data.length === 0 || (data.length !== 0 && data[0].Password !== Password)) {
    // add new user to the database
    await knex('users')
    .insert(req.body);
    let newestId = (await knex.raw('SELECT MAX(id) from "users"')).rows[0].max;
    // create session cookie
    req.session.user = await {
      UserId: newestId,
      Username: req.body.Username
    };
  }
  else {
    // create session cookie
    req.session.user = await {
      UserId: data[0].id,
      Username: data[0].Username
    };
  }
  // Be it a new user or an existing one logging back in, the user is redirected to the homepage
  res.json(req.session.user);
})



// DELETE Requests:
// Delete a specific item
app.delete('/detail/:id', async (req, res) => {
  // Deletes the specific item in the database
  await knex('items')
    .del()
    .where("id", "=", req.params.id)
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(404).json(err)
    )
})



// Exports the file for later user
module.exports = app;
