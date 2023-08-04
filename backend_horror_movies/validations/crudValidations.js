const checkTD = (req, res, next) => {
  if (!req.query.title ^ !req.query.date) {
    res.status(400).json({ error: "enter original title and release date" });
  } else next();
};

const checkSearch = (req, res, next) => {
  if (!req.query.title || req.query.title.length < 2) {
    res.status(400).json({ error: "Please enter a valid title" });
  } else next();
};

const checkId = (req, res, next) => {
  if (Number.isNaN(+req.params.id)) {
    res.status(400).json({ error: "id must be a number" });
  } else next();
};

const checkNum = (req, res, next) => {
  if (Number.isNaN(+req.params.num)) {
    res.status(400).json({ error: "limit value must be a number" });
  } else next();
};

const checkPost = (req, res, next) => {
  let count = 0;
  let arr = Object.keys(req.body);
  if ((arr.length && arr.length < 6) || arr.length == 0) {
    res.status(400).json({ err: "make new post body" });
  } else {
    [
      "original_title",
      "original_language",
      "overview",
      "runtime",
      "release_date",
      "genre_names",
    ].forEach((item) => {
      if (item in req.body) count++;
    });
    if (count < 6) {
      res.status(400).json({ err: "make new post body" });
    } else {
      next();
    }
  }
};

const checkPut = (req, res, next) => {
  let arr = Object.keys(req.body);
  if (arr.length == 0) {
    res.status(400).json({ err: "make new update body" });
  } else {
    for (let n of arr) {
      if (
        ![
          "original_title",
          "title",
          "original_language",
          "overview",
          "tagline",
          "release_date",
          "poster_path",
          "popularity",
          "vote_count",
          "vote_average",
          "budget",
          "revenue",
          "runtime",
          "status",
          "genre_names",
          "collection",
          "collection_name",
        ].includes(n)
      ) {
        res.status(400).json({ err: "make new update body" });
      }
    }
    next();
  }
};

module.exports = {
    checkTD,
    checkSearch,
    checkId,
    checkNum,
    checkPost,
    checkPut,
  };

