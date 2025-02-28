import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <Container fluid>
      <h2>My Favorite Movies</h2>
      <Row>
        {favorites.length > 0 ? (
          favorites.map((movie, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Title className="favorite-text">{movie.Title}</Card.Title>
                  <Card.Text className="favorite-text">Year: {movie.Year}</Card.Text>
                  <Card.Text className="favorite-text">IMDB ID: {movie.imdbID}</Card.Text>
                  <Button onClick={() => handleRemoveFavorite(movie.imdbID)}>Remove from Favorites</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;