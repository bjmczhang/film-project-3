import "./FilmDetail.css";

export function FilmDetail({ selectedFilm }) {
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    tagline,
  } = selectedFilm;
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
