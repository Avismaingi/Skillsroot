import React from "react";
import { Form } from "react-bootstrap";

function Requirements({
  isTeammatesRequired,
  setIsTeammatesRequired,
  isTrainerRequired,
  setIsTrainerRequired,
  isLoanRequired,
  setIsLoanRequired,
  noOfTeammates,
  setNoOfTeammates,
  workPreference,
  setWorkPreference,
}) {
  return (
    <div className="border-bottom py-2">
      <h6>Other Requirements</h6>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label="Looking for teammates"
          value={isTeammatesRequired}
          onChange={(e) => setIsTeammatesRequired(e.target.checked)}
          checked={isTeammatesRequired}
        />
        {isTeammatesRequired && (
          <Form.FloatingLabel
            label="No. of teammates"
            controlId="floatingInput"
          >
            <Form.Control
              type="number"
              placeholder="No. of teammates"
              value={noOfTeammates}
              onChange={(e) => setNoOfTeammates(e.target.value)}
              required
            />
          </Form.FloatingLabel>
        )}
      </Form.Group>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label="Looking for a mentor"
          value={isTrainerRequired}
          onChange={(e) => setIsTrainerRequired(e.target.checked)}
          checked={isTrainerRequired}
        />
      </Form.Group>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label="I need assistant in getting loan"
          value={isLoanRequired}
          onChange={(e) => setIsLoanRequired(e.target.checked)}
          checked={isLoanRequired}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <h6>Work Preference</h6>
        </Form.Label>
        <Form.Select
          value={workPreference}
          onChange={(e) => setWorkPreference(e.target.value)}
        >
          <option value="Remote">Remote</option>
          <option value="On Site (Offline)">On Site (Offline)</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Anything is fine">Anything is fine</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
}

export default Requirements;
