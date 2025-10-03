import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "416a0160"; // Replace with your key

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      if (data.Response === "True") setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "#141414", minHeight: "100vh" }}>
      <Link to="/" style={{ color: "#e50914", textDecoration: "none", fontSize: "1.2rem" }}>
        ← Back
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", gap: "20px" }}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
          style={{ width: "300px", borderRadius: "10px" }}
        />
        <div style={{ maxWidth: "700px" }}>
          <h1>{movie.Title} ({movie.Year})</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", backgroundColor: "#e50914", padding: "10px 15px", borderRadius: "5px", textDecoration: "none" }}
          >
            Watch on IMDb
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
