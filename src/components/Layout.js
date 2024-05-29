import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <div className="header-content">
          <Link to="/">
            <img src="/logo.png" alt="FilmPro Logo" className="main-logo" />
          </Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/want-to-watch">Want to Watch</Link></li>
              <li><Link to="/watched">Watched Movies</Link></li>
              <li><Link to="/trending">Trending Movies</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
