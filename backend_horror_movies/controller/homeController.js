const express = require("express");
const router = express.Router();
const {getHomeInfo } = require('../queries/movies');

router.get("/", async(req, res) => {
  const collections = await getHomeInfo();
  if (collections[0]) res.json(collections);
  else res.status(500).json({err: 'pg error'})
});

module.exports = router;
