const express = require("express");
const router = express.Router();
const {getMovies, getMoviesByTD} = require('../queries/movies');

router.get("/", async(req, res, next) => {
  if (req.query.title) {
  const movies = await getMoviesByTD(req.query.title, req.query.date);
  if (movies[0]) res.json(movies);
  else res.status(500).json({err: 'pg error'})
  } else next()
});

router.get("/", async(req, res) => {
  const movies = await getMovies();
  if (movies[0]) res.json(movies);
  else res.status(500).json({err: 'pg error'})
});

module.exports = router;
