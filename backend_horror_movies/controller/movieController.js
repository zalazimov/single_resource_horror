const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMoviesByTD,
  getMoviesByTitle,
  getMoviesBySubstring,
  getMoviesLimit,
  getMoviesById,
  addRow,
  deleteRow,
  updateRow,
} = require("../queries/movies");

const {
  checkTD,
  checkSearch,
  checkId,
  checkNum,
  checkPost,
  checkPut,
} = require("../validations/crudValidations");

router.get("/", async (req, res, next) => {
  if (req.query.title && !req.query.date) {
    const movies = await getMoviesByTitle(req.query.title);
    if (movies[0]) res.json(movies);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/search", checkSearch, async (req, res, next) => {
  if (req.query.title) {
    const movies = await getMoviesBySubstring(req.query.title.trim());
    if (movies[0]) res.json(movies);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/", checkTD, async (req, res, next) => {
  if (req.query.title) {
    const movies = await getMoviesByTD(req.query.title, req.query.date);
    if (movies[0]) res.json(movies);
    else res.status(500).json({ err: "pg error" });
  } else next();
});

router.get("/", async (req, res) => {
  const movies = await getMovies();
  if (movies[0]) res.json(movies);
  else res.status(500).json({ err: "pg error" });
});

router.get("/limit/:num", checkNum, async (req, res) => {
  const movie = await getMoviesLimit(req.params.num);
  if (movie[0]) res.json(movie);
  else res.status(500).json({ err: "pg error" });
});

router.get("/:id", checkId, async (req, res) => {
  const movie = await getMoviesById(req.params.id);
  if (movie[0]) res.json(movie);
  else res.status(500).json({ err: "pg error" });
});

router.post("/", checkPost, async (req, res) => {
  const newRow = await addRow(req.body);
  if (newRow[0]) res.status(201).json(newRow[0]);
  else res.status(500).json({ err: "pg error" });
});

router.delete("/:id", checkId, async (req, res) => {
  const id = req.params.id;
  const status = await deleteRow(id);
  if (status[0]) res.json(status[0]);
  else res.redirect("/notfound");
});

router.put("/:id", checkId, checkPut, async (req, res) => {
  try {
    const updateMovie = await updateRow(req.body, req.params.id);
    if (updateMovie.length === 0) {
      res.status(404).json("This movie is not found");
    } else {
      res.status(200).json(updateMovie[0]);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;