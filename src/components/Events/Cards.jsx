import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "../../firebase";
import "./Cards.css";
import { Badge, Button, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function Cards() {
  const { currentUser } = useAuth();
  const [ideas, setIdeas] = useState({ ideas: [] });
  const [loader, setLoader] = useState(true);
  const [disable, setDisabled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getUserValues = async () => {
      let data = await database.workshop().get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      // console.log(data);
      setIdeas({
        ...ideas,
        ideas: data,
      });
    };
    getUserValues();
  }, []);

  const handleRegister = async (workshopId) => {
    const newEvent = {
      workshopId,
      name: currentUser.name,
      phone: currentUser.phone,
      email: currentUser._delegate.email,
      uid: currentUser.id,
    };

    // console.log(newEvent);

    const data = await database.register().add(newEvent);
    // console.log(data);
    alert("Registered!!!");
  };

  return (
    <React.Fragment>
      <ul className="list-group">
        {ideas.ideas.map((item) => {
          //   console.log(item);
          return (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div style={{ marginRight: 20 }}>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                  <div className="d-flex">
                    <span>Keywords:</span>
                    <div>
                      {item.tags.map((_item, index) => (
                        <Badge
                          bg="secondary"
                          pill
                          className="m-1"
                          key={index + _item}
                        >
                          {_item}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      {item.skills.map((_item, index) => (
                        <Badge
                          bg="secondary"
                          pill
                          className="m-1"
                          key={index + _item}
                        >
                          {_item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="my-1">
                    Date: {item.date} | Time: {item.time}
                  </div>
                  <div className="my-1">Speaker: {item.lead.name}</div>
                </div>
                <button
                  className="btn btn-sm my-2 btn-dark"
                  onClick={() => handleRegister(item.id)}
                >
                  Register
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export default Cards;
