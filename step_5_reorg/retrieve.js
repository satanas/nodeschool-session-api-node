const { ObjectId }  = require('mongodb');
const { check, validationResult } = require('express-validator/check');

async function singleHandler(db, req, res) {
  const results = await db.collection('characters').find({}).toArray();
  res.send(results);
}

async function collectionHandler(db, req, res) {
  const results = await db.collection('characters').find({ _id: ObjectId(req.params.id) }).toArray();
  res.send(results);
}

const validationRules = [
  check('id')
    .exists()
];

module.exports = {
  singleHandler,
  collectionHandler,
  validationRules
}
