const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const { check, validationResult } = require('express-validator/check');

const port = 8000;
const dbUrl = 'mongodb://localhost:27017';
const databaseName = 'star_wars_db';

const app = express();

app.use(bodyParser.json());

// Check https://github.com/chriso/validator.js#validators for more validation rules
const validationRules = [
  check('name')
    .isLength({ min: 3 }),
  check('association')
    .isIn(['Jedi', 'Sith', 'Other'])
];

MongoClient.connect(dbUrl, { useNewUrlParser: true })
.then((client) => {
  const db = client.db(databaseName);

  app.post('/characters', validationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const character = {
      name: req.body.name,
      association: req.body.association
    };

    const result = await db.collection('characters').insertOne(character);
    character.links = [{
      rel: "self",
      href: `${req.protocol}://${req.hostname}:${port}/characters/${character._id}`
    }];
    res.send(character);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})
.catch((err) => {
  console.log('Error getting db connection');
});
