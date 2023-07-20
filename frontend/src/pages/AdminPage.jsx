/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPage.css";
import Swal from "sweetalert2";

function AdminPage() {
  const [data, setData] = useState("");
  const [isFav, setIsFav] = useState("isFavorite");
  const [isLoading, setIsLoading] = useState(true);
  const [, setSelectedMovie] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  function handleClickFavorite(event) {
    event.stopPropagation();
    setIsFav(!isFav);
  }

  function handleMouseEnter(movie) {
    setSelectedMovie(movie);
    Swal.fire({
      title: movie.title,
      text: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w400/${movie.poster_path}`,
      imageWidth: 400,
      imageHeight: 600,
      imageAlt: "Movie Poster",
    });
  }

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/all/day?language=fr&api_key=3fd2be6f0c70a2a598f084ddfb75487c"
      )
      .then((response) => {
        setData(response.data.results);
        // console.log(response.data.results);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    }
    if (vote >= 5) {
      return "orange";
    }
    return "red";
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">WebSiteName</div>
        <ul className="navbar-nav">
          <div className="nav-item">
            <a className="nav-link" href="#" />
          </div>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item-active">
            <a className="nav-link" /* href="#" */>Connexion</a>
          </li>
        </ul>
      </nav>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un film "
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="container-content">
        <div className="filter">
          <h3>Genres</h3>
          <ul>
            <li className="filter-list">Action</li>
            <li className="filter-list">Animation</li>
            <li className="filter-list">News</li>
            <li className="filter-list"> Adventure</li>
            <li />
          </ul>
        </div>
        <div className="page-wrapper">
          {data.map((el) => (
            <div
              key={el.id}
              className="card-style-1"
              onClick={() => handleMouseEnter(el)}
            >
              <div className="image-container">
                <div className="image">
                  <img
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${el.poster_path}`}
                    alt={el.title}
                  />
                </div>
                <div
                  id="favorite"
                  onClick={handleClickFavorite}
                  className={isFav ? "notFavorite" : "isFavorite"}
                />
              </div>
              <div className="content">
                <div className="bubble">
                  <span className={getClassByRate(el.vote_average)}>
                    {el.vote_average}
                  </span>
                </div>
                <h2>{el.title}</h2>
                <p>{el.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
