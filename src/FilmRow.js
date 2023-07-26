import { Link } from "react-router-dom";
import "./FilmRow.css";

function FilmRow({
  film,
  showDetail,
  addToFaves,
  selectedList,
  removeFromFaves,
}) {
  const { id, title, poster_path, overview, release_date } = film;
  const year = new Date(release_date).getFullYear();

  return (
    <div className="FilmRow">
      <img
        src={`https://image.tmdb.org/t/p/w780${poster_path}`}
        alt={`${title} film poster`}
        onClick={() => showDetail(film)}
      />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>{year}</p>
        <div className="actions">
          <button
            className="action"
            onClick={() =>
              selectedList === "all" ? addToFaves(film) : removeFromFaves(film)
            }
          >
            <span className="material-icons">
              {selectedList === "all" ? "add_to_queue" : "remove_from_queue"}
            </span>
          </button>

          <Link to={`/films/${id}`} className="action">
            <span className="material-icons">read_more</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilmRow;
