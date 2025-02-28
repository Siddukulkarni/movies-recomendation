import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  const handleRemoveReview = (imdbid) => {
    const updatedReviews = reviews.filter(review => review.imdbid !== imdbid);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  return (
    <Container fluid>
      <h2>My Reviews</h2>
      <Row>
        {reviews.length > 0 ? (
          reviews.map((review, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title className="review-text">{review.title}</Card.Title>
                  <Card.Text  className="review-text">IMDB ID: {review.imdbid}</Card.Text>
                  <Card.Text className="review-text">Review: {review.text}</Card.Text>
                  <Button onClick={() => handleRemoveReview(review.imdbid)}>Remove Review</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No reviews added yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Reviews;