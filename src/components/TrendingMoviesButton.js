import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; 

const TrendingMoviesButton = () => (
  <Link to="/trending" className="button red-button">Žhavé Novinky</Link>
);

export default TrendingMoviesButton;
