import React from "react";
import { Link } from "react-router-dom";
import { Badge, Card } from "react-bootstrap";

const STATUS = {
  Planned: "warning",
  Progress: "primary",
  Completed: "success",
};

const IdeaCard = ({ item }) => {
  return (
    <div className="col-md-5 mx-auto my-2 p-3" key={item.id}>
      <Card className="shadow p-0">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Header>
          <div className="d-flex align-items-center">
            <img
              src={item.lead.profile}
              alt="Profile"
              className="img-fluid"
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
              }}
            />
            <div style={{ marginLeft: 15 }}>
              <h6>
                <small>
                  {item.lead.name}
                  <br />
                  <span>
                    <small>{item.lead.email}</small>
                  </span>
                </small>
              </h6>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-2">
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            {item.description.length < 80
              ? item.description
              : item.description.substring(0, 75) + "..."}
          </Card.Text>
          <div>
            <Badge bg={STATUS[item.status]} className="m-1">
              {item.status}
            </Badge>{" "}
            <span className="mx-1">|</span>
            <Badge bg="danger" className="m-1">
              {item.workPreference}
            </Badge>
          </div>
          <div className="d-flex my-3">
            <span>Keywords:</span>
            <div>
              {item.tags.map((_item, index) => (
                <Badge bg="secondary" pill className="m-1" key={index + _item}>
                  {_item}
                </Badge>
              ))}
            </div>
            <div>
              {item.skills.map((_item, index) => (
                <Badge bg="secondary" pill className="m-1" key={index + _item}>
                  {_item}
                </Badge>
              ))}
            </div>
          </div>

          <Link
            to={`/ideas/${item.id}`}
            className="btn btn-dark btn-sm text-decoration-none text-light"
          >
            Read More
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

function DisplayIdeasList({ list = [] }) {
  return (
    <div className="row my-3 align-items-start">
      {list.length ? (
        list.map((item, index) => (
          <IdeaCard item={item} key={index + item.title} />
        ))
      ) : (
        <p>No ideas found!</p>
      )}
    </div>
  );
}

export default DisplayIdeasList;
