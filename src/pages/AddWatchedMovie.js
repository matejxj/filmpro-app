import React, { useState, useContext, useEffect } from 'react';
import { WatchedMoviesContext } from '../contexts/WatchedMoviesContext';

const AddWatchedMovie = () => {
  const { addWatchedMovie } = useContext(WatchedMoviesContext);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [watchedMoviesList, setWatchedMoviesList] = useState([]);

  useEffect(() => {
    fetch('/watchedMovies.json')
      .then(response => response.json())
      .then(data => setWatchedMoviesList(data))
      .catch(error => console.error('Error fetching watched movies:', error));
  }, []);

  const handleAddMovie = () => {
    const movie = watchedMoviesList.find(m => m.id === parseInt(selectedMovieId));
    if (movie) {
      addWatchedMovie(movie);
    }
  };

  return (
    <div>
      <h2>Add Watched Movie</h2>
      <select value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
        <option value="">Select a movie</option>
        {watchedMoviesList.map(movie => (
          <option key={movie.id} value={movie.id}>{movie.title}</option>
        ))}
      </select>
      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
};

export default AddWatchedMovie;
