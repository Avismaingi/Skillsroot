import React from "react";
import { Badge } from "react-bootstrap";

function UpdateAdhaarMessage() {
  return (
    <div className="my-2 text-center">
      <Badge bg="danger">
        Please upload your Aadhaar Card Document in your profile settings
      </Badge>
    </div>
  );
}

export default UpdateAdhaarMessage;
