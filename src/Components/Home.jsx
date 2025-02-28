import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const apiKey = "e2e1750c";
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&page=1&s=`;

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(movieUrl + query);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      alert('Please enter a movie name to search');
    }
  };

  const handleAddReview = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    const review = {
      title: selectedMovie.Title,
      imdbid: selectedMovie.imdbID,
      text: reviewText
    };
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    setShowModal(false);
    alert(`Review for ${selectedMovie.Title} submitted!`);
  };

  const handleAddToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${movie.Title} added to favorites!`);
  };

  return (
    <Container fluid className="home-container">
      <div className="header-section">
        <h1 className="animated-title">MoviesRulz</h1>
        <p className="animated-subtitle">Dive into a universe of cinematic wonders</p>
        <Form onSubmit={handleSearch} className="search-form">
          <Form.Control
            type="search"
            placeholder="Enter your movie to Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="submit" className="search-button">Search</Button>
        </Form>
      </div>
      <Row className={`movie-grid ${movies.length === 1 ? 'single-result' : ''}`}>
        {movies.map((movie, i) => (
          <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="movie-card">
              <Card.Img variant="top" src={movie.Poster} className="movie-poster" />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Year: {movie.Year}</Card.Text>
                <Card.Text>IMDB ID: {movie.imdbID}</Card.Text>
                <Button onClick={() => handleAddReview(movie)} className="review-button">Add Review</Button>
                <Button onClick={() => handleAddToFavorites(movie)} className="favorite-button">Add to Favorites</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review for {selectedMovie?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="review-textarea"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmitReview} className="submit-review-button">Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;