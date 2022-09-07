import React, {useState, useEffect} from 'react'
import { Form } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import BasicDetails from "./BasicDetails";
import SkillsRequired from "./SkillsRequired";
import Tags from "./Tags";

function PostEvent(){
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [link , setLink] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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

    const newEvent = {
      lead: {
        name: currentUser.name || "Username",
        profile: currentUser.displayProfile || "",
      },
      title,
      description,
      tags,
      skills,
      link,
      date,
      time,
    };

    console.log(newEvent);
    const data = await database.workshop().add(newEvent);
    console.log(data);
    alert("Posted your idea!!!");
  };

  return(
    <div className="col-lg-10 my-5 mx-2 mx-lg-auto bg-light rounded">
    <div className="mb-2 pb-1 border-bottom text-center">
      <h4>Post Workshop Details</h4>
    </div>
    <div className="row my-2 p-1">
      <div className="col-md-7 mx-auto">
        <Form onSubmit={handleSubmit}>
          <BasicDetails
            title={title}
            setTitle={setTitle}
            description={description}
            time = {time}
            setTime = {setTime}
            date = {date}
            setDate = {setDate}
            setDescription={setDescription}
          />

          <Tags tags={tags} setTags={setTags} />
          <SkillsRequired skills={skills} setSkills={setSkills} />
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
  )


}

export default PostEvent;