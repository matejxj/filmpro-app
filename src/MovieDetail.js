import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { WatchedMoviesContext } from '../contexts/WatchedMoviesContext';

const MovieDetail = () => {
  const { id } = useParams();
  const { watchedMovies } = useContext(WatchedMoviesContext);

  
  const movieId = parseInt(id, 10);
  const movie = watchedMovies.find(movie => movie.id === movieId);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} />
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
      <p>Description: {movie.description}</p>
    </div>
  );
};

export default MovieDetail;
