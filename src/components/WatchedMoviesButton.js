import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; 

const WatchedMoviesButton = () => (
  <Link to="/watched" className="button red-button">Zhlédnuté Filmy</Link>
);

export default WatchedMoviesButton;
