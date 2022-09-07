import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import Base from "./Base";

function Registration() {
  const { currentUser } = useAuth();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await database.ideas().add({ name: "Hello" });
    // alert("Posted your idea!!!");
    // console.log(isLoanRequired);

    const newEvent = {
      workshopId: params.id,
      name,
      email,
      phone,
      uid: currentUser.id,
    };

    // console.log(newEvent);
    const data = await database.register().add(newEvent);
    // console.log(data);
    alert("Registered!!!");
    window.location.reload();
  };

  return (
    <div className="col-lg-10 my-5 mx-2 mx-lg-auto bg-light rounded">
      <div className="mb-2 pb-1 border-bottom text-center">
        <h4>Post Workshop Detaiasdls</h4>
      </div>
      <div className="row my-2 p-1">
        <div className="col-md-7 mx-auto">
          <Form onSubmit={handleSubmit}>
            <Base
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
            />

            <button
              type="submit"
              className="btn btn-info my-2"
              style={{ float: "right" }}
            >
              Register
            </button>
            <button
              type="submit"
              className="btn btn-info my-2"
              style={{ float: "right" }}
            >
              Details
              </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
