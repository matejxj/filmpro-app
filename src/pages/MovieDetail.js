import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log('Fetching details for movie ID:', id); 
    const fetchMovies = async () => {
      try {
        const moviesResponse = await fetch('/movies.json');
        const trendingMoviesResponse = await fetch('/trendingMovies.json');
        const watchedMoviesResponse = await fetch('/watchedMovies.json');

        const moviesData = await moviesResponse.json();
        const trendingMoviesData = await trendingMoviesResponse.json();
        const watchedMoviesData = await watchedMoviesResponse.json();

        console.log('Movies Data:', moviesData);
        console.log('Trending Movies Data:', trendingMoviesData);
        console.log('Watched Movies Data:', watchedMoviesData);

        const allMovies = [...moviesData, ...trendingMoviesData, ...watchedMoviesData];
        const selectedMovie = allMovies.find(movie => movie.id === parseInt(id));
        setMovie(selectedMovie);
        console.log('Selected Movie:', selectedMovie); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [id]);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const imageUrl = movie.posterUrl.startsWith('http') 
    ? movie.posterUrl 
    : `${process.env.PUBLIC_URL}/images/${movie.posterUrl}`;
  
  console.log('Image URL:', imageUrl); 

  return (
    <div className="movie-detail-container">
      <h2>{movie.title}</h2>
      <img 
        src={imageUrl} 
        alt={movie.title} 
        className="movie-poster" 
      />
      <div className="movie-details">
        <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Description:</strong> {movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
