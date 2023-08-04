const db = require("../db/dbConfig");

//get all movies
async function getMovies() {
  const someMovie = await db
    .any("select * from horrmovies ORDER BY id")
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return someMovie;
}

//get movies with num limit
async function getMoviesLimit(args) {
  const someMovie = await db
    .any(`select * from horrmovies ORDER BY id limit ${args}`)
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return someMovie;
}
//get movie by original title and release_date
async function getMoviesByTD(title, date) {
  const someMovie = await db
    .any(
      "select * from horrmovies where original_title = $1 and release_date = $2",
      [title, date]
    )
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return someMovie;
}

//get movie by original title
async function getMoviesByTitle(title) {
  const someMovie = await db
    .any(
      "select * from horrmovies where original_title ILIKE $1 ORDER BY release_date DESC",
      [title]
    )
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return someMovie;
}

//get movie by title that contains substring entered
async function getMoviesBySubstring(title) {
  const someMovie = await db
    .any(
      `select * from horrmovies where original_title ILIKE '%${title}%' ORDER BY release_date DESC`,
      [title]
    )
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return someMovie;
}

//get movie by id
async function getMoviesById(id) {
  const movie = await db
    .any("select * from horrmovies where id = $1", id)
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return movie;
}

//get the collections and movies stored in the database
async function getCollections() {
  const collections = await db
    .any(
      `select distinct collection_name, collection from horrmovies where collection_name is not null 
    and collection is not null order by collection`
    )
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return collections;
}

async function getCollById(id) {
  const coll = await db
    .any("select * from horrmovies where collection = $1", id)
    .then((res) => res)
    .catch((e) => {
      return e;
    });
  return coll;
}

//creating a new movie entry
async function addRow(args) {
  try {
    const Row = await db.any(`INSERT INTO horrmovies (${Object.keys(args).join(
      ","
    )}) 
        VALUES (${Object.values(args)
          .map((item) => {
            return `'${item}'`;
          })
          .join(",")}) RETURNING *`);
    return Row;
  } catch (e) {
    return e;
  }
}

//deleting a movie entry
async function deleteRow(args) {
  try {
    const Del = await db.any(
      `DELETE FROM horrmovies where id = ${args} RETURNING *`
    );
    return Del;
  } catch (e) {
    return e;
  }
}

//update a movie entry
async function updateRow(args, id) {
  let arr = Object.keys(args);
  let vals = Object.values(args);
  try {
    const Row = await db.any(
      `UPDATE horrmovies SET ${arr
        .map((item, i) => {
          return `${item} = '${vals[i]}'`;
        })
        .join(", ")} where
        id = $1 RETURNING *`,
      id
    );
    return Row;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getMovies,
  getMoviesByTD,
  getMoviesByTitle,
  getMoviesBySubstring,
  getMoviesLimit,
  getMoviesById,
  getCollections,
  getCollById,
  addRow,
  deleteRow,
  updateRow,
};
