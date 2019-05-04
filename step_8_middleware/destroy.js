const { ObjectId }  = require('mongodb');
const { check, validationResult } = require('express-validator/check');

async function handler(db, req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { result } = await db.collection('characters').deleteOne({ _id: ObjectId(req.params.id) });

  if (result.n !== 0) {
    res.status(204).send({});
  } else {
    res.status(404).send({});
  }
}

const validationRules = [
  check('id')
    .exists()
];

module.exports = {
  handler,
  validationRules
}
