import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = "416a0160"; // Replace with your OMDb API key

// Trending movies (popular & easily identified by OMDb)
const trendingMovies = [
  "Inception",
  "Avengers: Endgame",
  "RRR",
  "Dangal",
  "Avatar",
  "Top Gun: Maverick",
  "The Dark Knight",
  "Interstellar",
  "Pushpa",
  "3 Idiots",
  "Ponniyin Selvan",
  "Brahmastra",
  "Lucifer",
];

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      const results = await Promise.all(
        trendingMovies.map(async (title) => {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
          );
          const data = await res.json();
          return data.Response === "True" ? data : null;
        })
      );
      setMovies(results.filter((m) => m !== null));
    };
    fetchTrending();
  }, []);

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setSearchResults(data.Search);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) setSearchResults([]);
  }, [searchQuery]);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🎬 CineScope</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="category">
            <h2 className="category-title">Search Results</h2>
            <div className="movie-grid">
              {searchResults.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Trending Movies */}
        <div className="category">
          <h2 className="category-title">🔥 Trending</h2>
          <div className="movie-grid">
            {movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
            ) : (
              <p className="no-movies">Loading trending movies...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MovieApp;
