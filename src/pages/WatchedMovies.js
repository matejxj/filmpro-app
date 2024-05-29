import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Movies.css';

const WatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    fetch('/watchedMovies.json')
      .then(response => response.json())
      .then(data => setWatchedMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h2>Movies You Have Watched</h2>
      {watchedMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movies-container">
          {watchedMovies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={movie.id || index} className="movie-button">
              <img src={`/images/${movie.posterUrl}`} alt={movie.title} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchedMovies;
