import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [wantToWatchMovies, setWantToWatchMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies.json')
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });

    axios.get('http://localhost:8001/wantToWatch/list?userId=user1')
      .then(response => {
        setWantToWatchMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching want to watch movies:', error);
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
    axios.post('http://localhost:8001/wantToWatch/create', {
      userId: 'user1',
      movieId: movie.movieId,
      title: movie.title,
      posterUrl: movie.posterUrl,
      description: movie.description,
      genre: movie.genre,
      rating: movie.rating
    })
      .then(response => {
        console.log('Movie added:', response.data);
        setWantToWatchMovies([...wantToWatchMovies, response.data]);
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <Container>
      <h1 className="my-4">Search Movies</h1>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <h2 className="my-4">Movies You Want to Watch</h2>
      <Row className="my-4">
        {wantToWatchMovies.length === 0 ? (
          <p>You have not added any movies yet.</p>
        ) : (
          wantToWatchMovies.map(movie => (
            <Col key={movie.movieId} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <h2 className="my-4">Search Results</h2>
      <Row className="my-4">
        {filteredMovies.map(movie => (
          <Col key={movie.movieId} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Button variant="primary" onClick={() => handleAddMovie(movie)}>Add to Want to Watch</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchMovies;
