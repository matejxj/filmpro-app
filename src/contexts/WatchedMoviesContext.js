import React, { createContext, useState, useEffect } from 'react';

export const WatchedMoviesContext = createContext();

export const WatchedMoviesProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    fetch('/watchedMovies.json')
      .then(response => response.json())
      .then(data => setWatchedMovies(data))
      .catch(error => console.error('Error fetching watched movies:', error));
  }, []);

  return (
    <WatchedMoviesContext.Provider value={{ watchedMovies, setWatchedMovies }}>
      {children}
    </WatchedMoviesContext.Provider>
  );
};
