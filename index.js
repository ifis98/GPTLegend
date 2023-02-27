const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const fs = require("fs");
const cors = require('cors')

require('dotenv-flow').config();

require('./routes/middlewares/mongo');

const app = express()
const port = 3080
const https = require("https");

app.use(morgan('dev'))
app.use(cors())
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.set('jwt', "ebeb1a5ada5cf38bfc2b49ed5b3100e0");

app.use('/api', require('./routes/api'))

// Default Index Page
app.use(express.static(__dirname + '/build'));
// Send all other items to index file
app.get('*', (req, res) => res.sendFile(__dirname + '/build/index.html'));

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, function () {
    console.log(
      "Example app listening on port 3080!"
    );
  });