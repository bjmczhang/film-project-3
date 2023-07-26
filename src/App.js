import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmLibrary from "./FilmLibrary";
import Home from "./Home";
import NotFound from "./NotFound";
import FilmDetail, { FilmDetailEmpty } from "./FilmDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/films" element={<FilmLibrary />}>
          <Route path=":filmID" element={<FilmDetail />} />
          <Route path="" element={<FilmDetailEmpty />}></Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
