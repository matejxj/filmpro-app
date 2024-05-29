import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieListContext = createContext();

const MovieListProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8001/wantToWatch/list');
        console.log('Fetched movies:', response.data); 
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieListContext.Provider value={{ movies, loading }}>
      {children}
    </MovieListContext.Provider>
  );
};

export { MovieListProvider };
