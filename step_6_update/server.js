const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient }  = require('mongodb');
const { check, validationResult } = require('express-validator/check');
const create = require('./create');
const retrieve = require('./retrieve');
const update = require('./update');

const port = 8000;
const dbUrl = 'mongodb://localhost:27017';
const databaseName = 'star_wars_db';

const app = express();

app.use(bodyParser.json());

MongoClient.connect(dbUrl, { useNewUrlParser: true })
.then((client) => {
  const db = client.db(databaseName);

  app.post('/characters', create.validationRules, create.handler.bind(this, db));

  app.get('/characters', retrieve.singleHandler.bind(this, db));

  app.get('/characters/:id', retrieve.validationRules, retrieve.collectionHandler.bind(this, db));

  app.put('/characters/:id', update.validationRules, update.handler.bind(this, db));

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})
.catch((err) => {
  console.log('Error getting db connection');
});
