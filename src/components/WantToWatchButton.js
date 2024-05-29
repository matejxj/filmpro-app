import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; 

const WantToWatchButton = () => (
  <Link to="/want-to-watch" className="button red-button">Filmy, Které Chci Vidět</Link>
);

export default WantToWatchButton;
