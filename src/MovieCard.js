import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

export default MovieCard;
