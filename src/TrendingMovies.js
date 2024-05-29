import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    axios.get('/trendingMovies.json') 
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching trending movies:', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Trending Movies</h1>
      <Row>
        {movies.length === 0 ? (
          <p>No trending movies available.</p>
        ) : (
          movies.map(movie => (
            <Col key={movie.movieId} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
                  <Card.Text><strong>Rating:</strong> {movie.rating}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default TrendingMovies;
