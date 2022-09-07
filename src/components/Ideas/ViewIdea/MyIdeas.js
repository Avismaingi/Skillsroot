import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Loading from "../../../containers/Loading";
import { database } from "../../../firebase";
import DisplayIdeasList from "./../DisplayIdeasList";
import { NavLink } from "react-router-dom";

let MyIdeas = () => {
  let [ideasList, setIdeasList] = useState({
    ideas: [],
  });
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserValues = async () => {
      setLoading(true);
      let data = await database
        .ideas()
        .where("lead.email", "==", currentUser._delegate.email)
        .get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      setIdeasList({
        ...ideasList,
        ideas: data,
      });

      setLoading(false);
    };
    getUserValues();
  }, []);

  if (loading) {
    return <Loading msg="Loading your innovative ideas" />;
  }

  return (
    <React.Fragment>
      {ideasList.ideas.length > 0 ? (
        <section className="col-md-10 container bg-light">
          <DisplayIdeasList list={ideasList.ideas}></DisplayIdeasList>
        </section>
      ) : (
        <section className="mt-3 text-center">
          <h3>
            No Ideas! Post Your Ideas
            <NavLink className="px-2" to="/ideas/post">
              Here
            </NavLink>
          </h3>
        </section>
      )}
    </React.Fragment>
  );
};

export default MyIdeas;
