import React, { useState } from "react";
import { Form, InputGroup, Badge } from "react-bootstrap";

function SkillsRequired({ skills, setSkills }) {
  const [skill, setSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (!skill) return;

    setSkills((prev) => [skill, ...prev]);
    setSkill("");
  };

  return (
    <div className="border-bottom py-2">
      <h6>Required Skills</h6>
      <InputGroup className="mt-3 mb-1" style={{ width: "100%" }}>
        <Form.Control
          type="text"
          placeholder="Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text
          id="basic-addon2"
          className="btn btn-warning pt-2"
          onClick={handleAddSkill}
        >
          Add
        </InputGroup.Text>
      </InputGroup>
      <div className="">
        {skills.map((item, index) => (
          <Badge bg="secondary" className="m-1" key={index + item}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default SkillsRequired;
