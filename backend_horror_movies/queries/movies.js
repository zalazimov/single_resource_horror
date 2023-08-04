const db = require('../db/dbConfig');

async function getMovies() {
    const someMovie = await db.any('select * from horrmovies limit 20').then(res => res).catch(e => { throw e })
    return someMovie
}
//get movie by original title and release_date
async function getMoviesByTD(title, date) {
    const someMovie = await db.any('select * from horrmovies where original_title = $1 and release_date = $2', [title, date]).then(res => res).catch(e => { throw e })
    return someMovie
}
async function getMoviesById(id) {
    const movie = await db.any('select * from horrmovies where id = $1', id).then(res => res).catch(e => { throw e })
    return movie
}

async function getCollections() {
    const collections = await db.any(`select distinct collection_name, collection from horrmovies where collection_name is not null 
    and collection is not null order by collection`).then(res => res).catch(e => { throw e })
    return collections
}

async function getCollById(id) {
    const coll = await db.any('select * from horrmovies where collection = $1', id).then(res => res).catch(e => { throw e })
    return coll
}

async function addRow(args) {
    try {
        const Row = await db.any(`INSERT INTO horrmovies (${Object.keys(args).join(',')}) 
        VALUES (${Object.values(args).map(item => { return `'${item}'` }).join(',')}) RETURNING *`);
        return Row;
    } catch (e) { return e }
};

async function deleteRow(args) {
    try {
        const Del = await db.any(`DELETE FROM horrmovies where id = ${args} RETURNING *`);
        return Del;
    } catch (e) { return e }
};

module.exports = { getMovies, getMoviesByTD, getMoviesById, getCollections, getCollById, addRow, deleteRow, }