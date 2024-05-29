import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { MovieListContext } from '../contexts/MovieListContext';
import { Link } from 'react-router-dom';
import '../Movies.css';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

const WantToWatchMovies = () => {
  const { wantToWatchMovies, setWantToWatchMovies } = useContext(MovieListContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies.json')
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMovie = (movie) => {
    console.log('Adding movie:', movie); 
    axios.post('http://localhost:8001/wantToWatch/create', {
      userId: 'user1',
      movieId: movie.id, 
      title: movie.title,
      posterUrl: movie.posterUrl,
      description: movie.description,
      genre: movie.genre,
      rating: movie.rating
    })
      .then(response => {
        console.log('Movie added:', response.data); 
        setWantToWatchMovies(prevMovies => [...prevMovies, response.data]);
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <div>
      <h2>Want to Watch Movies</h2>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <h3>Search Results</h3>
      <Row className="my-4">
        {filteredMovies.map(movie => (
          <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Button variant="primary" onClick={() => handleAddMovie(movie)}>+</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3>Your Want to Watch Movies</h3>
      {wantToWatchMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movies-container">
          {wantToWatchMovies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={movie.id || index} className="movie-button">
              <img src={`/images/${movie.posterUrl}`} alt={movie.title} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WantToWatchMovies;
