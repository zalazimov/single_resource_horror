import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../common/Overlay";
import { MovieContext } from "../Context/context";
import { fetchIndexData } from "../api";

function Index() {
  const { isLoading, setIsLoading } = useContext(MovieContext);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchIndexData()
      .then((res) => {
        setIsLoading(false);
        setMovies(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container mt-2 pt-5">
        {movies ? (
          <>
            <h3 className="mt-5 text-warning text-center">Movie DataBase</h3>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>original title</th>
                  <th>original language</th>
                  <th>overview</th>
                  <th>release date</th>
                  <th>runtime</th>
                  <th>genre names</th>
                  <th>vote average</th>
                  <th>budget</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.original_title}</td>
                    <td>{item.original_language}</td>
                    <td>
                      {item.overview
                        ? item.overview.slice(0, 25) + "..."
                        : item.tagline.slice(0, 25)}
                    </td>
                    <td>{item.release_date.split("T")[0]}</td>
                    <td>{item.runtime.toString() + "m"}</td>
                    <td>{item.genre_names}</td>
                    <td>{item.vote_average}</td>
                    <td>${item.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="alert alert-primary" role="alert">
            Unable to load info
          </div>
        )}
      </div>
    </Overlay>
  );
}

export default Index;
