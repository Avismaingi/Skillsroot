import React from "react";
import { Form } from "react-bootstrap";

function BasicDetails({
  title,
  setTitle,
  description,
  setDescription,
  setLink,
  link,
  date,
  setDate,
  time,
  setTime,
}) {
  return (
    <div className="border-bottom">
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Title" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Event Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      {/* <Form.Group className="my-2">
        <Form.FloatingLabel label="Link" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Link to event"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group> */}
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Date" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Time" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Description" controlId="floatingInput">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Innovative description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
    </div>
  );
}

export default BasicDetails;
