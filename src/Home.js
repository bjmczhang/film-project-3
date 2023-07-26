import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to the Films App!</h1>
      <p>Explore a collection of films and their details.</p>
      <Link to="/films" className="button">
        Go to Films
      </Link>
    </div>
  );
}

export default Home;
