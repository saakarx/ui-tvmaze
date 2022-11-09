import React from 'react';
import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, Container, Button } from 'react-bootstrap';
import Pill from '../../components/Pill';

export const loader = async () => {
  const { data } = await axios.get('https://api.tvmaze.com/search/shows?q=all');
  return data;
};

const Home = () => {
  const shows = useLoaderData();

  return (
    <Container fluid className="py-6 px-3">
      <h1 className="mb-3">All Shows</h1>
      <Row
        xs="1"
        sm="2"
        md="3"
        lg="4"
        xl="5"
        xxl="6"
        style={{ '--bs-gutter-y': '1.5rem' }}
      >
        {shows &&
          shows.length &&
          shows.map(({ show }) => {
            console.log(show);
            return (
              <Col key={show.id}>
                <Card className="rounded-3 overflow-hidden h-100">
                  <CardImg
                    variant="top"
                    src={show.image.medium}
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Link
                      className="text-decoration-none"
                      to={`/shows/${show.id}`}
                    >
                      <Card.Title>{show.name}</Card.Title>
                    </Link>
                    <div className="d-flex gap-2 flex-wrap">
                      <Pill text={show.language} />
                      {show.genres &&
                        show.genres.length &&
                        show.genres.map(genre => (
                          <Pill key={genre} text={genre} variant="secondary" />
                        ))}
                    </div>
                    <span
                      className="my-2"
                      style={{
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box'
                      }}
                      dangerouslySetInnerHTML={{ __html: show.summary }}
                    ></span>
                    <span></span>
                    <Link
                      to={`/shows/${show.id}`}
                      className="mt-auto text-white text-decoration-none"
                    >
                      <Button
                        variant="primary"
                        className="text-uppercase w-100"
                        style={{ letterSpacing: 1 }}
                      >
                        View
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Home;
