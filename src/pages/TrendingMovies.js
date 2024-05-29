import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Movies.css';

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch('/trendingMovies.json');
        const data = await response.json();
        setTrendingMovies(data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending Movies</h2>
      {trendingMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movies-container">
          {trendingMovies.map((movie, index) => (
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

export default TrendingMovies;
