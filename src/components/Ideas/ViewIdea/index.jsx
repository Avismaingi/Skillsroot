import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../containers/Loading";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";

const STATUS = {
  Planned: "warning",
  Progress: "primary",
  Completed: "success",
};

function ViewIdea() {
  const params = useParams();
  const { currentUser } = useAuth();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teammates, setTeammates] = useState([]);

  const navigate = useNavigate();

  const getIdea = async () => {
    //   console.log(params.id);
    setLoading(true);
    let doc = await database.ideas().doc(params.id).get();
    if (!doc.exists) {
      navigate("/ideas", { replace: true });
    }
    doc = database.formatDocument(doc);
    // console.log(doc);
    setIdea(doc);

    // get teammates
    const team = [];
    doc.teammates.forEach(async (uid) => {
      let person = await database.users().doc(uid).get();
      // console.log(database.formatDocument(person));
      person = database.formatDocument(person);
      team.push(person.name);

      // console.log(team);
      setTeammates(team);
    });

    setLoading(false);
  };

  useEffect(() => {
    if (params.id) {
      getIdea();
    }
  }, [params]);

  const handleClickBecomeMentor = async () => {
    try {
      setLoading(true);
      //   console.log(currentUser._delegate.email);
      await database.ideas().doc(idea.id).update({
        mentor: currentUser._delegate.email,
      });
      alert("Became a mentor successfully!");
    } catch (error) {
      console.log(error.message);
    } finally {
      getIdea();
    }
  };

  const handleClickCollaborate = async () => {
    try {
      setLoading(true);
      await database
        .ideas()
        .doc(idea.id)
        .update({
          teammates: [...idea.teammates, currentUser.id],
        });
      alert("Joined as collaborator successfully!");
    } catch (error) {
      console.log(error.message);
    } finally {
      getIdea();
    }
  };

  const handleChangeSaveStatus = async (e) => {
    e.preventDefault();

    const status = e.target.Status.value;
    // console.log(status);
    try {
      setLoading(true);
      //   console.log(currentUser._delegate.email);
      await database.ideas().doc(idea.id).update({
        status,
      });
      alert("Status changed successfully!");
    } catch (error) {
      console.log(error.message);
    } finally {
      getIdea();
    }
  };

  if (loading) {
    return <Loading msg="Loading idea..." />;
  }

  return (
    <div className="col-lg-6 my-5 mx-2 mx-lg-auto bg-light rounded p-2">
      {/* Lead */}
      <div className="my-2">
        <div className="d-flex align-items-center">
          <img
            src={idea.lead.profile}
            alt="Profile"
            className="img-fluid"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
          />
          <div style={{ marginLeft: 15 }}>
            <h6>
              {idea.lead.name}
              <br />
              <span>
                <small>{idea.lead.email}</small>
              </span>
            </h6>
          </div>
        </div>
      </div>
      <hr />

      {/* basic detail */}
      <div className="">
        <div className="my-1 border-bottom ">
          <h6>
            <small>Title</small>
          </h6>
          <h5>{idea.title}</h5>
        </div>
        <div className="my-1">
          <h6>
            <small>Description</small>
          </h6>
          <p>{idea.description}</p>
        </div>
      </div>
      <hr />

      {/* Status */}
      <div className="">
        <h6>
          <small>Status</small>
        </h6>
        <Badge bg={STATUS[idea.status]} className="m-1">
          {idea.status}
        </Badge>
        {idea.lead.email === currentUser._delegate.email && (
          <form onSubmit={handleChangeSaveStatus}>
            <div className="form-group">
              <label htmlFor="">Change Status</label>
              <select
                name="Status"
                id=""
                className="form-control"
                defaultValue={idea.status}
              >
                <option value="Planned">Planned</option>
                <option value="Progress">Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button className="btn btn-sm btn-info mt-2">
                Save status change
              </button>
              <hr />
            </div>
          </form>
        )}
      </div>

      {/* Tags */}
      <div className="my-3">
        <h6>
          <small>Tags</small>
        </h6>
        <div className="mt-1">
          {idea.tags.map((item, index) => (
            <Badge bg="secondary" className="m-1" key={index + item}>
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {/* Required Skills */}
      <div className="">
        <h6>
          <small>Required Skills</small>
        </h6>
        <div className="mt-1">
          {idea.skills.map((item, index) => (
            <Badge bg="secondary" className="m-1" key={index + item}>
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <hr />

      {idea.lead.email !== currentUser._delegate.email &&
        idea.status !== "Completed" &&
        idea.isTeammatesRequired && (
          <div className="d-flex align-items-center justify-content-between">
            {" "}
            {/* Collaborate */}
            <div>
              <h6>Required Team size: {idea.noOfTeammates} </h6>
              <p>No. of Collaborators: {idea.teammates.length}</p>
            </div>
            <button
              disabled={
                (currentUser.role === "trainer" && !currentUser.aadhar) ||
                currentUser.role === "trainer" ||
                idea.noOfTeammates - idea.teammates.length === 0 ||
                idea.teammates.includes(currentUser.id) ||
                idea.mentor === currentUser._delegate.email
              }
              className="btn btn-info btn"
              onClick={handleClickCollaborate}
            >
              Collaborate
            </button>
          </div>
        )}
      {idea.lead.email !== currentUser._delegate.email &&
        idea.status !== "Completed" &&
        idea.isTrainerRequired && (
          <div className="py-2 d-flex align-items-center justify-content-between">
            {" "}
            {/* Trainer */}
            <div>
              <h6>
                Mentor:{" "}
                {idea.mentor || (
                  <small className="text-secondary">No Mentor</small>
                )}{" "}
              </h6>
            </div>
            <button
              disabled={
                (currentUser.role === "trainer" && !currentUser.aadhar) ||
                currentUser.role === "employee" ||
                idea.mentor ||
                idea.teammates.includes(currentUser.id) ||
                idea.mentor === currentUser._delegate.email
              }
              className="btn btn-info btn"
              onClick={handleClickBecomeMentor}
            >
              Become Mentor
            </button>
          </div>
        )}

      {/* role in this team */}
      <div className="text-danger">
        <small>
          <em>
            {idea.teammates.includes(currentUser.id) && (
              <span>*You are the part of this team as a collaborator</span>
            )}
            {idea.mentor === currentUser._delegate.email && (
              <span>*You the mentor for this team</span>
            )}
          </em>
        </small>
      </div>

      {/* Teammates */}
      {idea.lead.email === currentUser._delegate.email &&
        idea.teammates.length !== 0 && (
          <div className="my-2">
            <h6>Teammates</h6>
            <ul className="list-group">
              {teammates.map((team, index) => (
                <li className="list-group-item" key={team + index}>
                  {team}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

export default ViewIdea;
