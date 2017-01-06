const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('config');

const postRoutes = require('./routes/posts');

const PORT = 3000;
const dbOptions = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectionTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectionTimeoutMS: 30000
    }
  }
};

mongoose.connect(config.DBHost, dbOptions, (err) => console.log(err || "Connected to " + config.DBHost));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// app.use('/book', postRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome to Postagram!' }));

app.listen(PORT, (err) => console.log(err || 'Listening on PORT ' + PORT));

module.exports = app;
