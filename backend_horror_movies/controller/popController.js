const express = require("express");
const router = express.Router();
const {
  getPopularMovies
} = require("../queries/movies");

router.get("/", async (req, res) => {
  const movies = await getPopularMovies();
  if (movies[0]) res.json(movies);
  else res.status(500).json({ err: "pg error" });
});


module.exports = router;
