### Using the API

```bash
http GET localhost:3001/movies

http GET localhost:3001/movies/limit/5

http GET localhost:3001/movies/limit/desc/5

http GET localhost:3001/movies title==searchquery

http GET localhost:3001/collections

http GET localhost:3001/collections/5

http DELETE localhost:3001/movies/5

http POST localhost:3001/movies -j <<< '{"original_title":"testmovie", "original_language":"sp", "overview":"a great adventure", "runtime":100, "release_date":"2023-02-11", "genre_names":"Action, Horror"}'

http PUT localhost:3001/movies/2 -j <<< '{"original_title":"testmovie Edit"}'
```