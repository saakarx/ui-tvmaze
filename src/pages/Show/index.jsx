import { useState } from 'react';
import axios from 'axios';
// prettier-ignore
import { Button, Col, Container, Image, Row, Modal, ModalHeader, ModalTitle, ModalBody, Form, FormControl, FormLabel, FormGroup, FormSelect, Alert } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import Pill from '../../components/Pill';

export const loader = async ({ params }) => {
  const { data } = await axios.get(
    `https://api.tvmaze.com/shows/${params.showId}`
  );
  return data;
};

const Show = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [date, setDate] = useState('');
  const [timings, setTimings] = useState('08:00');

  const showData = useLoaderData();
  const updatedDate = new Date(showData.updated * 1000);
  console.log(showData);

  const bookTicket = e => {
    e.preventDefault();
    if (!date) return alert('Date cannot be empty');
    if (!timings) return alert('Timings cannot be empty');

    const ticket = {
      date,
      timings,
      tickets: parseInt(tickets),
      name: showData.name
    };
    localStorage.setItem('ticket', JSON.stringify(ticket));
    setIsModalShown(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <Container className="py-6 px-3" fluid>
      {showAlert && (
        <Alert variant="success">
          Booked {tickets} tickets for {showData.name}
        </Alert>
      )}
      <BackButton />
      <h1 className="mb-3">{showData.name}</h1>
      <Row>
        <Col xs="12" sm="5" md="4" className="mb-3">
          <Image
            style={{ maxHeight: '600px', objectFit: 'cover' }}
            className="rounded-3 w-100 mb-3"
            src={showData.image.medium}
            draggable={false}
          />
          <div className="d-flex gap-2 flex-wrap">
            <Pill text={showData.language} />
            {showData.genres &&
              showData.genres.length &&
              showData.genres.map(genre => (
                <Pill key={genre} text={genre} variant="secondary" />
              ))}
          </div>
          <p className="mt-3">
            <span className="fw-bold">Premiered:</span> {showData.premiered}
          </p>
          <p>
            <span className="fw-bold">Last updated on:</span>{' '}
            {`${updatedDate.getFullYear()}-${String(
              updatedDate.getMonth()
            ).padStart(2, 0)}-${String(updatedDate.getDate()).padStart(2, 0)}`}
          </p>
        </Col>
        <Col xs="12" sm="7" md="8">
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: showData.summary }}
          ></p>
          <span className="rating d-inline-flex align-items-center justify-content-center">
            {'Rated ' + (showData.rating.average ? showData.rating.average : 0)}
            <span className="rating-star">★</span>
          </span>
          <br />
          {showData.ended ? (
            <span className="mt-3 d-inline-block">
              Show ended on {showData.ended}
            </span>
          ) : (
            <span className="mt-3 d-inline-block">
              Every {showData.schedule.days[0]} at {showData.schedule.time}
            </span>
          )}
          <br />
          <Button
            variant="secondary"
            className="my-3 w-100"
            style={{ maxWidth: 250 }}
            onClick={() => setIsModalShown(true)}
          >
            Book Tickets
          </Button>
        </Col>
      </Row>
      <Modal show={isModalShown} onHide={() => setIsModalShown(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Book Tickets for {showData.name}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>Number of tickets</FormLabel>
              <FormControl
                type="number"
                min={1}
                value={tickets}
                onChange={e => setTickets(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Date</FormLabel>
              <FormControl
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Timings</FormLabel>
              <FormSelect
                value={timings}
                onChange={e => setTimings(e.target.value)}
              >
                <option>08:00</option>
                <option>10:00</option>
                <option>12:00</option>
                <option>14:00</option>
                <option>16:00</option>
                <option>18:00</option>
              </FormSelect>
            </FormGroup>
            <div className="modal-btns mt-3">
              <Button
                type="button"
                variant="danger"
                onClick={() => setIsModalShown(false)}
              >
                Exit
              </Button>
              <Button type="submit" variant="success" onClick={bookTicket}>
                Book
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Show;
