import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const AddWantToWatchMovie = () => {
  const [movie, setMovie] = useState({
    userId: 'user1',
    movieId: '',
    title: '',
    posterUrl: 'http://example.com/default.jpg',  
    description: 'Default description',  
    genre: 'Default genre',  
    rating: 5.0  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/wantToWatch/create', movie)
      .then(response => {
        console.log('Movie added:', response.data);
        
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <Container>
      <h1 className="my-4">Add Want to Watch Movie</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="movieId">
          <Form.Label>Movie ID</Form.Label>
          <Form.Control
            type="text"
            name="movieId"
            value={movie.movieId}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Control
          type="hidden"
          name="posterUrl"
          value={movie.posterUrl}
        />
        <Form.Control
          type="hidden"
          name="description"
          value={movie.description}
        />
        <Form.Control
          type="hidden"
          name="genre"
          value={movie.genre}
        />
        <Form.Control
          type="hidden"
          name="rating"
          value={movie.rating}
        />
        <Button variant="primary" type="submit">Add Movie</Button>
      </Form>
    </Container>
  );
};

export default AddWantToWatchMovie;
