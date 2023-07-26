import { useEffect, useState } from "react";
import "./FilmDetail.css";
import { useParams } from "react-router-dom";

export function FilmDetail() {
  const { filmID } = useParams();
  const [selectedFilm, setSelectedFilm] = useState(null);

  const READ_ACCESS_TOKEN = process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${filmID}`, options)
      .then((response) => response.json())
      .then((response) => setSelectedFilm(response))
      .catch((err) => console.error(err));
  }, [filmID]);

  if (!selectedFilm) {
    return <FilmDetailEmpty />;
  }

  const { title, poster_path, backdrop_path, overview, tagline } = selectedFilm;

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
          alt={`${title} backdrop`}
        />
        <h1 className="film-title">{title}</h1>
      </figure>

      <div className="film-meta">
        <h2>{tagline}</h2>
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780${poster_path}`}
            className="film-detail-poster"
            alt={`${title} poster`}
          />

          {overview}
        </p>
      </div>
    </div>
  );
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  );
}

export default FilmDetail;
