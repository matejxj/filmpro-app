import React, { useState } from 'react';
import axios from 'axios';

function CreateMovie() {
  const [movieId, setMovieId] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (movie) => {
    movie.preventDefault();

    const newMovie = { movieId, title };

    axios.post('http://localhost:8001/trendingMovies/create', newMovie)
      .then(response => {
        console.log('Movie created:', response.data);
        setMovieId('');
        setTitle('');
      })
      .catch(error => {
        console.error('There was an error creating the movie!', error);
      });
  };

  return (
    <div>
      <h2>Create Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie ID:</label>
          <input
            type="text"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
}

export default CreateMovie;
