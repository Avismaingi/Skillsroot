import React from "react";
import { Form } from "react-bootstrap";

function BasicDetails({
  title,
  setTitle,
  description,
  setDescription,
  readOnly = false,
}) {
  return (
    <div className="border-bottom">
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Title" controlId="floatingInput">
          <Form.Control
            type="text"
            placeholder="Innovative name for your innovative idea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            readOnly={readOnly}
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="my-2">
        <Form.FloatingLabel label="Description" controlId="floatingInput">
          <Form.Control
            as="textarea"
            // rows={5}
            placeholder="Innovative description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            readOnly={readOnly}
          />
        </Form.FloatingLabel>
      </Form.Group>
    </div>
  );
}

export default BasicDetails;
