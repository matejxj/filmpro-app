// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WantToWatchMovies from './pages/WantToWatchMovies';
import WatchedMovies from './pages/WatchedMovies';
import TrendingMovies from './pages/TrendingMovies';
import MovieDetail from './pages/MovieDetail';
import MovieListProvider from './contexts/MovieListContext';
import { UserProvider } from './contexts/UserContext';
import { WatchedMoviesProvider } from './contexts/WatchedMoviesContext';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <MovieListProvider>
          <WatchedMoviesProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/want-to-watch" element={<WantToWatchMovies />} />
                <Route path="/watched" element={<WatchedMovies />} />
                <Route path="/trending" element={<TrendingMovies />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
              </Routes>
            </Layout>
          </WatchedMoviesProvider>
        </MovieListProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
