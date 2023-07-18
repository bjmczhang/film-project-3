import { FilmDetail, FilmDetailEmpty } from "./FilmDetail";
import FilmRow from "./FilmRow";
import { useEffect, useState } from "react";

import "./FilmLibrary.css";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedList, setSelectedList] = useState("all");
  const [faves, setFaves] = useState([]);
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");

  const sectionCount = films.length;
  const favesCount = faves.length;

  const READ_ACCESS_TOKEN = process.env.REACT_APP_READ_ACCESS_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?primary_release_year=${selectedYear}&sort_by=popularity.desc&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setFilms([...films, ...response.results]);
      })
      .catch((err) => console.error(err));
  }, [selectedYear, page]);

  const fetchDetail = (film) => {
    fetch(`https://api.themoviedb.org/3/movie/${film.id}`, options)
      .then((response) => response.json())
      .then((response) => setSelectedFilm(response))
      .catch((err) => console.error(err));
  };

  const handleShowDetail = (film) => {
    fetchDetail(film);
  };

  const handleAddToFaves = (film) => {
    faves.includes(film) ? setFaves(faves) : setFaves([...faves, film]);
  };

  const handleRemoveFaves = (film) => {
    setFaves(faves.filter((fave) => fave.id !== film.id));
    setSelectedFilm(selectedFilm.id === film.id ? null : selectedFilm);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setFilms([]);
    setPage(1);
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button
            className={`film-list-filter ${
              selectedList === "all" ? "is-active" : null
            }`}
            onClick={() => {
              setSelectedList("all");
              setSelectedFilm(null);
            }}
          >
            ALL
            <span className="section-count">{sectionCount}</span>
          </button>
          <button
            className={`film-list-filter ${
              selectedList === "faves" ? "is-active" : null
            }`}
            onClick={() => {
              setSelectedList("faves");
              setSelectedFilm(null);
            }}
          >
            FAVES
            <span className="section-count">{favesCount}</span>
          </button>
        </div>
        {selectedList === "all" ? (
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="selectYear"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
          </select>
        ) : null}

        {(selectedList === "faves" ? faves : films).map((film, index) => (
          <FilmRow
            film={film}
            key={index}
            showDetail={handleShowDetail}
            addToFaves={handleAddToFaves}
            selectedList={selectedList}
            removeFromFaves={handleRemoveFaves}
          />
        ))}
        {selectedList === "all" ? (
          <button className="loadMore" onClick={handleLoadMore}>
            Load more
          </button>
        ) : null}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm !== null ? (
          <FilmDetail selectedFilm={selectedFilm} />
        ) : (
          <FilmDetailEmpty />
        )}
      </div>
    </div>
  );
}

export default FilmLibrary;
