const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const collController = require("./controller/collController");
const movieController = require("./controller/movieController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/movies", movieController);
app.use("/collections", collController);

app.get("/", (req, res) => {
  res.send("Welcome to FormidulosusWiki");
});
app.get('/notfound', (req, res) => { res.status(404).send('invalid request') })

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
