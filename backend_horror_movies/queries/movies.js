const db = require('../db/dbConfig');

async function getMovies() {
    const someMovie = await db.any('select * from horrmovies limit 20').then(res => res).catch(e => {throw e})
    return someMovie
}
//get movie by original title and release_date
async function getMoviesByTD(title, date) {
    const someMovie = await db.any('select * from horrmovies where original_title = $1 and release_date = $2', [title, date]).then(res => res).catch(e => {throw e})
    return someMovie
}

module.exports = { getMovies, getMoviesByTD }