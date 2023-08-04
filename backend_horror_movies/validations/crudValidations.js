const checkTD = (req, res, next) => {
    if (!req.query.title ^ !req.query.date) {
        res.status(400).json({ error: 'enter original title and release date' })
    } else next()
}

const checkId = (req, res, next) => {
    if (Number.isNaN(+req.params.id)) {
        res.status(400).json({ error: 'id must be a number' })
    } else next()
}

const checkPost = (req, res, next) => {
    let count = 0;
    let arr = Object.keys(req.body)
    if (arr.length && arr.length < 6 || arr.length == 0) {
        res.status(400).json({ err: 'make new post body' })
    }
    else {
        ['original_title', 'original_language', 'overview', 'runtime', 'release_date', 'genre_names'].forEach(item => { if (item in req.body) count++; })
        if (count < 6) {
            res.status(400).json({ err: 'make new post body' })
        } else { next() }
    }
}

module.exports = { checkTD, checkId, checkPost }