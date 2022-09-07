import React from "react";
import { Spinner } from "react-bootstrap";
import CenteredContainer from "./CenteredContainer";

function Loading({ msg }) {
  return (
    <CenteredContainer>
      <div className="text-center">
        <Spinner animation="grow" variant="info" />
        {msg && <p>{msg}</p>}
      </div>
    </CenteredContainer>
  );
}

export default Loading;
