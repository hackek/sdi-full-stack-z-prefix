/*
CODE QUARANTINE:

// const morgan = require('morgan');
// const cors = require('cors');

// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());

// knex('items')
//   .select('*')
//   .then(allItems => {
//     var pokemonAvailable = allItems.map(item => item.ItemName)
//     res.json(pokemonAvailable);
//   })

*/



// Initialize useful constants and dependencies
const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const app = express();
const port = 3001;
const knex = require('knex')(require('../knexfile.js')["development"]);
const cors=require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PATCH", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true
})) // Use this after the variable declaration

app.use(session({
  name: "current_session",
  secret: 'pokemon master',
  resave: false,
  saveUninitialized: false,
  cookie: {

  }
}))

// Listen at the designated port for sending api call answers
app.listen(port, () => {
  console.log("Your app is up and running!")
})

app.use(express.json());

// GET Requests:
// Get the total list of items
app.get('/', (req, res) => {
  knex('items')
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
app.get('/login', (req, res) => {
  knex('users')
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
app.get('/detail/:id', (req, res) => {
  knex('items')
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
app.patch('/detail/:id', (req, res) => {
  knex('items')
  .where("id", "=", req.params.id)
  .update(req.body)
  .then(data =>
    res.status(200).json(data)
  )
  .catch(err =>
    res.status(400).json(
      {message: errorMessage}
    )
  )
})


// POST Requests:
// Create a new item
app.post('/', (req, res) => {
  knex('items')
    .insert(req.body)
    .then(data => {
      res.redirect('/')
    })
    .catch(err =>
      res.status(404).json(err)
    );
})

// Create a user account
app.post('/login', async (req, res) => {
  // Take the input username and password from the user's submission
  const { FirstName, LastName, Username, Password } = req.body;
  // Return an error if either the username or password were not filled out at all
  if (FirstName == undefined || LastName == undefined || Username == undefined || Password == undefined) {
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
    req.session.user = {
      UserId: data[0].id,
      Username: data[0].Username
    };
  }
  // Be it a new user or an existing one logging back in, the user is redirected to the homepage
  res.json(req.session.user);
})



// DELETE Requests:
// Delete a specific item
app.delete('/detail/:id', (req, res) => {
  knex('items')
    .where("id", "=", req.params.id)
    .del()
    .then(data =>
      res.redirect('/')
    )
    .catch(err =>
      res.status(404).json(err)
    )
})




module.exports = app;
