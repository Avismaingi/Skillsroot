import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { database } from "../../../firebase";
import BasicDetails from "./BasicDetails";
import Requirements from "./Requirements";
import SkillsRequired from "./SkillsRequired";
import Tags from "./Tags";
import { useAuth } from "../../../contexts/AuthContext";

function PostMyIdea() {
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isTeammatesRequired, setIsTeammatesRequired] = useState(false);
  const [noOfTeammates, setNoOfTeammates] = useState(0);
  const [isTrainerRequired, setIsTrainerRequired] = useState(false);
  const [isLoanRequired, setIsLoanRequired] = useState(false);
  const [workPreference, setWorkPreference] = useState("Remote");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await database.ideas().add({ name: "Hello" });
    // alert("Posted your idea!!!");
    // console.log(isLoanRequired);
    if (!tags.length) {
      alert("At least 1 tag is required!");
      return;
    }

    if (!skills.length) {
      alert("At least 1 skill set is required!");
      return;
    }
    // console.log(currentUser);

    const newIdea = {
      lead: {
        name: currentUser.name || "Anonymous Username",
        profile:
          currentUser.image ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        email: currentUser._delegate.email || "anonymous@hfb.com",
      },
      title,
      description,
      tags,
      skills,
      isTeammatesRequired,
      noOfTeammates: isTeammatesRequired ? noOfTeammates : 0,
      teammates: [],
      isTrainerRequired,
      mentor: "",
      status: "Planned",
    };

    // console.log(newIdea);
    const data = await database.ideas().add(newIdea);
    console.log(data);
    alert("Posted your idea!!!");
    navigate(`/ideas/${data.id}`, { replace: true });
  };

  return (
    <div className="col-lg-10 my-5 mx-2 mx-lg-auto bg-light rounded">
      <div className="mb-2 pb-1 border-bottom text-center">
        <h4>Post My Idea</h4>
      </div>
      <div className="row my-2 p-1">
        <div className="col-md-7 mx-auto">
          <Form onSubmit={handleSubmit}>
            <BasicDetails
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />

            <Tags tags={tags} setTags={setTags} />
            <SkillsRequired skills={skills} setSkills={setSkills} />
            <Requirements
              isTeammatesRequired={isTeammatesRequired}
              setIsTeammatesRequired={setIsTeammatesRequired}
              noOfTeammates={noOfTeammates}
              setNoOfTeammates={setNoOfTeammates}
              isTrainerRequired={isTrainerRequired}
              setIsTrainerRequired={setIsTrainerRequired}
              isLoanRequired={isLoanRequired}
              setIsLoanRequired={setIsLoanRequired}
              workPreference={workPreference}
              setWorkPreference={setWorkPreference}
            />

            <button
              type="submit"
              className="btn btn-info my-2"
              style={{ float: "right" }}
            >
              Post
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PostMyIdea;
