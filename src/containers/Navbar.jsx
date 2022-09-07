import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Dropdown } from "react-bootstrap";

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div className="navbar bg-light shadow align-items-center justify-content-between py-2">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          {/* <img
            src={require("../icon.jpg")}
            alt="Icon"
            className="pb-2"
            style={{
              width: 30,
              marginRight: 5,
              borderRadius: 2,
            }}
          />*/}
          <h4>
            <Link to="/" className="text-decoration-none text-dark">
              Skills Hub
            </Link>
          </h4>
        </div>
        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <Link
                  to="/admin"
                  style={{ marginRight: 15 }}
                  className="text-decoration-none"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/ideas"
                style={{ marginRight: 15, textDecoration: "none" }}
              >
                Ideas
              </Link>
              <Link
                to="/workshop"
                style={{ marginRight: 15, textDecoration: "none" }}
              >
                Workshops
              </Link>

              <Link
                to="/learn-skills/resources"
                style={{ marginRight: 15, textDecoration: "none" }}
              >
                Resources
              </Link>

              <Link
                to="/request-loan-assistance"
                style={{ marginRight: 15, textDecoration: "none" }}
              >
                Loan Assistance
              </Link>

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i className="fas fa-2x fa-user-circle"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      style={{ marginRight: 15, textDecoration: "none" }}
                    >
                      My Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/myIdeas"
                      style={{ marginRight: 15, textDecoration: "none" }}
                    >
                      My Ideas
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link
                      to="/myCollaborations"
                      style={{ marginRight: 15, textDecoration: "none" }}
                    >
                      My Collaborations
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Link to="/login" className="text-decoration-none">
              <button className="btn btn-sm btn-danger">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
