import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WatchedMoviesButton from '../components/WatchedMoviesButton';
import TrendingMoviesButton from '../components/TrendingMoviesButton';
import WantToWatchButton from '../components/WantToWatchButton';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <img src="/logo.png" alt="FilmPro Logo" className="mb-4" style={{ width: '150px' }} />
      <Row className="mb-3">
        <Col>
          <WatchedMoviesButton />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <TrendingMoviesButton />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <WantToWatchButton />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
