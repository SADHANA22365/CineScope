import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
          className="movie-poster"
        />
      </Link>
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">{movie.Year}</p>
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="watch-link"
      >
        🎥 Watch on IMDb
      </a>
    </div>
  );
}

export default MovieCard;
