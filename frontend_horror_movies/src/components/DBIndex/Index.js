import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../common/Overlay";
import { MovieContext } from "../Context/context";
import { fetchIndexData, fetchIndexDataDesc, } from "../api";
import { updown } from "../../assets";

function Index() {
  const { isLoading, setIsLoading } = useContext(MovieContext);
  const [movies, setMovies] = useState(null);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (order) {
      fetchIndexDataDesc()
        .then((res) => {
          setIsLoading(false);
          setMovies(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      fetchIndexData()
        .then((res) => {
          setIsLoading(false);
          setMovies(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [order]);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container mt-2 pt-5">
        {movies ? (
          <>
            <h3 className="mt-5 text-warning text-center">Movie DataBase</h3>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID<img src={updown} style={{ width: '25px', height: '33px' }} alt='updown' onClick={() => setOrder(!order)} /></th>
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
                      {item.overview && item.overview.length > 25 ? item.overview.slice(0, 25) + "..." :
                        item.overview ? item.overview :
                          item.tagline.length > 25 ? item.tagline.slice(0, 25) + "..." : item.tagline}
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
