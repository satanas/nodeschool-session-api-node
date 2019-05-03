const { ObjectId }  = require('mongodb');
const { check, validationResult } = require('express-validator/check');

async function handler(db, req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const character = {
    name: req.body.name,
    association: req.body.association
  };

  const result = await db.collection('characters')
    .replaceOne({ _id: ObjectId(req.params.id) }, { $set: character });

  const newCharacter = await db.collection('characters').find({ _id: ObjectId(req.params.id) }).toArray();
  res.send(newCharacter);
}

const validationRules = [
  check('id')
    .exists(),
  check('name')
    .isLength({ min: 3 }),
  check('association')
    .isIn(['Jedi', 'Sith', 'Other'])
];

module.exports = {
  handler,
  validationRules
}
