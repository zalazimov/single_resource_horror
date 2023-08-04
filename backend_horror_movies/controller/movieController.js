const express = require("express");
const router = express.Router();
const { getMovies, getMoviesByTD, getMoviesById, addRow, deleteRow, } = require('../queries/movies');
const { checkTD, checkId, checkPost } = require('../validations/crudValidations')

router.get("/", checkTD, async (req, res, next) => {
  if (req.query.title) {
    const movies = await getMoviesByTD(req.query.title, req.query.date);
    if (movies[0]) res.json(movies);
    else res.status(500).json({ err: 'pg error' })
  } else next()
});

router.get("/", async (req, res) => {
  const movies = await getMovies();
  if (movies[0]) res.json(movies);
  else res.status(500).json({ err: 'pg error' })
});

router.get("/:id", checkId, async (req, res) => {
  const movie = await getMoviesById(req.params.id);
  if (movie[0]) res.json(movie);
  else res.status(500).json({ err: 'pg error' })
});

router.post('/', checkPost, async (req, res) => {
  const newRow = await addRow(req.body);
  if (newRow[0]) res.status(201).json(newRow[0]);
  else res.status(500).json({ err: 'pg error' })
})

router.delete('/:id', checkId, async (req, res) => {
  const id = req.params.id
  const status = await deleteRow(id);
  if (status[0]) res.json(status[0]);
  else res.redirect('/notfound')
})

module.exports = router;
