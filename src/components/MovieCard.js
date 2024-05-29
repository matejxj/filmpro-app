import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.posterUrl.startsWith('http') 
    ? movie.posterUrl 
    : `${process.env.PUBLIC_URL}/images/${movie.posterUrl}`;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={imageUrl} alt={movie.title} className="movie-poster" />
      </Link>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
