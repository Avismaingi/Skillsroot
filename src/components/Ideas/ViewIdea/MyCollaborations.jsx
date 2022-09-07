import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../containers/Loading";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";
import DisplayIdeasList from "../DisplayIdeasList";

function MyCollaborations() {
  let [ideasList, setIdeasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const getUserValues = async () => {
    try {
      setLoading(true);
      let data = await database
        .ideas()
        .where("teammates", "array-contains", currentUser._delegate.uid)
        .get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      setIdeasList(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserValues();
  }, []);

  if (loading) {
    return <Loading msg="Loading your collaborations" />;
  }

  return (
    <div>
      {ideasList.length > 0 ? (
        <section className="col-md-10 container bg-light">
          <DisplayIdeasList list={ideasList}></DisplayIdeasList>
        </section>
      ) : (
        <section className="mt-3 text-center">
          <h6>
            No Collaborations so far! Checkout the innovative Ideas
            <Link className="px-2" to="/ideas">
              Here
            </Link>
          </h6>
        </section>
      )}
    </div>
  );
}

export default MyCollaborations;
