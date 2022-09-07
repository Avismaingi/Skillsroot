import React from "react";
import { Form } from "react-bootstrap";

function BasicDetails({ name, setName, email, setEmail, phone, setPhone }) {
  return (
    <div className="border-bottom">
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Name" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Email" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Phone" controlId="floatingInput">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Phone No."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
    </div>
  );
}

export default BasicDetails;
