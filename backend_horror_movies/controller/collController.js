const express = require("express");
const router = express.Router();
const {getCollections, getCollById } = require('../queries/movies');
const { checkId } = require('../validations/crudValidations')

router.get("/", async(req, res) => {
  const collections = await getCollections();
  if (collections[0]) res.json(collections);
  else res.status(500).json({err: 'pg error'})
});

router.get("/:id", checkId, async(req, res) => {
  const coll = await getCollById(req.params.id);
  if (coll[0]) res.json(coll);
  else res.status(500).json({err: 'pg error'})
});

module.exports = router;
