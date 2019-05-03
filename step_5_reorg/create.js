const { check, validationResult } = require('express-validator/check');

async function createHandler(db, req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const character = {
    name: req.body.name,
    association: req.body.association
  };

  const result = await db.collection('characters').insertOne(character);
  res.status(201).send(character);
};

// Check https://github.com/chriso/validator.js#validators for more validation rules
const validationRules = [
  check('name')
    .isLength({ min: 3 }),
  check('association')
    .isIn(['Jedi', 'Sith', 'Other'])
];

module.exports = {
  handler: createHandler,
  validationRules: validationRules
}
