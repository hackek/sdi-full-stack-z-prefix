const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>
  res.send('Hello World!')
)
module.exports = app;