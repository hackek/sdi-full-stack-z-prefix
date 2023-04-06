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
const app = express();
const port = 3001;
const knex = require('knex')(require('../knexfile.js')["development"])


// Listen at the designated port for sending api call answers
app.listen(port, () => {
  console.log("Your app is up and running!")
})



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
  // res.send('Hello World! Here is the list of all users!')
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
  // res.send('Hello World! Here is the list of all detailed information for that product!')
  knex('items')
    .select('*')
    .where("id", "=", `${id}`)
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(400).json(
        {message: errorMessage}
      )
    )
})



// PUT Requests:
// Edit a specific item
app.put('/detail/:id', (req, res) => {
  res.send('Hello World! The editing of the specific item has finished!')
})


// POST Requests:
// Create a user account
app.post('/login', (req, res) => {
  res.send('Hello World! The new user account has been created!')
})

// Create a new item
app.post('/detail/:id', (req, res) => {
  res.send('Hello World! The new item has been created!')
})



// DELETE Requests:
// Delete a specific item
app.put('/detail/:id', (req, res) => {
  res.send('Hello World! The item requested has been deleted!')
})




module.exports = app;
