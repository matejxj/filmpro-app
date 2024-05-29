import React, { createContext, useState, useEffect } from 'react';

export const MovieListContext = createContext();

const MovieListProvider = ({ children }) => {
  const [wantToWatchMovies, setWantToWatchMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/movies.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWantToWatchMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieListContext.Provider value={{ wantToWatchMovies }}>
      {children}
    </MovieListContext.Provider>
  );
};

export default MovieListProvider;
