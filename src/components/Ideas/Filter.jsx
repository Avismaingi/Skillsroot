import React, { useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";

function Filter({ filterList, setFilterList, label }) {
  const [text, setText] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    setFilterList((prev) => [text, ...prev]);
    setText("");
  };

  return (
    <div className="my-2">
      <Form.Group>
        <Form.FloatingLabel
          style={{ width: "100%" }}
          label={label}
          controlId="floatingInput"
        >
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.FloatingLabel>
        <Button
          onClick={handleClick}
          size="sm"
          variant="outline-info"
          className="float-right m-1"
        >
          Add to filter
        </Button>
      </Form.Group>
      {filterList.map((_item, index) => (
        <Badge bg="secondary" pill className="m-1" key={index + _item}>
          {_item}
        </Badge>
      ))}
    </div>
  );
}

export default Filter;
