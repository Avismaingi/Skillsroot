import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import { database } from "../../firebase";
import SearchBox from "./SearchBox";
import { useAuth } from "../../contexts/AuthContext";

function Event() {
  const { currentUser } = useAuth();

  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(true);

  const getIdeasList = async () => {
    try {
      setLoading(true);
      let data = await database.workshop().get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      console.log(data);

      setList(data);
      setDisplayList(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setDisplayList(list);
  };

  const handleSearch = () => {
    if (!searchText) {
      setDisplayList(list);
      return;
    }

    const searchList = list.filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayList(searchList);
  };

  useEffect(() => {
    getIdeasList();
  }, []);

  return (
    <div className="col-lg-10 my-5 mx-2 mx-lg-auto">
      <div className="col-md-10 p-2 bg-light rounded my-2 mx-auto">
        <SearchBox
          text={searchText}
          setText={setSearchText}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
        <div className="mb-2 pb-1 border-bottom d-flex align-items-center justify-content-between">
          <h4>Workshops</h4>
          {(currentUser.role === "trainer" || currentUser.role === "admin") && (
            <Link to="/workshop/post" className="btn-info btn-sm btn">
              Post Workshop
            </Link>
          )}
        </div>
        <div>
          <Cards list={displayList} />
        </div>
      </div>
    </div>
  );
}

export default Event;
