import React, { useState } from "react";
import { Form, InputGroup, Badge } from "react-bootstrap";

function Tags({ tags, setTags }) {
  const [tag, setTag] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();

    if (!tag) return;

    setTags((prev) => [tag, ...prev]);
    setTag("");
  };

  return (
    <div className="border-bottom py-2">
      <h6>Tags</h6>
      <InputGroup className="mt-3 mb-1" style={{ width: "100%" }}>
        <Form.Control
          type="text"
          placeholder="Tag name"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text
          id="basic-addon2"
          className="btn btn-warning pt-2"
          onClick={handleAddTag}
        >
          Add
        </InputGroup.Text>
      </InputGroup>
      <div className="">
        {tags.map((item, index) => (
          <Badge bg="secondary" className="m-1" key={index + item}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Tags;
