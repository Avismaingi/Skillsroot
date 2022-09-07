import React from "react";
import { Button, Form } from "react-bootstrap";

function SearchBox({ text, setText, handleSearch, clearSearch }) {
  const handleClick = (e) => {
    e.preventDefault();

    handleSearch();
  };

  return (
    <div className="border-bottom mt-1 mb-3 pb-2">
      <Form.Group>
        <Form.FloatingLabel
          style={{ width: "100%" }}
          label="Search"
          controlId="floatingInput"
        >
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.FloatingLabel>
        <Button onClick={handleClick} size="sm" className="float-right m-1">
          Search
        </Button>
        <Button
          onClick={clearSearch}
          size="sm"
          variant="outline-secondary"
          className="float-right m-1"
        >
          Clear Search
        </Button>
      </Form.Group>
    </div>
  );
}

export default SearchBox;
