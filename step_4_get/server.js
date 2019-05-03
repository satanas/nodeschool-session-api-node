const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId }  = require('mongodb');
const { check, validationResult } = require('express-validator/check');

const port = 8000;
const dbUrl = 'mongodb://localhost:27017';
const databaseName = 'star_wars_db';

const app = express();

app.use(bodyParser.json());

// Check https://github.com/chriso/validator.js#validators for more validation rules
const createCharValidationRules = [
  check('name')
    .isLength({ min: 3 }),
  check('association')
    .isIn(['Jedi', 'Sith', 'Other'])
];

const fetchCharValidationRules = [
  check('id')
    .exists()
];

MongoClient.connect(dbUrl, { useNewUrlParser: true })
.then((client) => {
  const db = client.db(databaseName);

  app.post('/characters', createCharValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const character = {
      name: req.body.name,
      association: req.body.association
    };

    const result = await db.collection('characters').insertOne(character);
    res.send(character);
  });

  app.get('/characters', async (req, res) => {
    const results = await db.collection('characters').find({}).toArray();
    res.send(results);
  });

  app.get('/characters/:id', fetchCharValidationRules, async (req, res) => {
    const results = await db.collection('characters').find({ _id: ObjectId(req.params.id) }).toArray();
    res.send(results);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})
.catch((err) => {
  console.log('Error getting db connection');
});
