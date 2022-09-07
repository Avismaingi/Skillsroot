import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../containers/Loading";
import { database } from "../../firebase";
import DisplayIdeasList from "./DisplayIdeasList";
import Filter from "./Filter";
import SearchBox from "./SearchBox";

function Ideas() {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All");

  const [filterTagsList, setFilterTagsList] = useState([]);
  const [filterSkillsList, setFilterSkillsList] = useState([]);

  const [loading, setLoading] = useState(true);

  const getIdeasList = async () => {
    try {
      setLoading(true);
      let data = await database.ideas().get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      // console.log(data);

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
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayList(searchList);
  };

  const handleApplyFilter = () => {
    // const searchList = list.filter((item) => {
    //   filterSkillsList.forEach((skill) => {
    //     if (item.skills.includes(skill)) {
    //       return true;
    //     }
    //   });
    //   filterTagsList.forEach((tag) => {
    //     if (item.tags.includes(tag)) {
    //       return true;
    //     }
    //   });
    //   return false;
    // });
    // console.log(searchList);
  };

  useEffect(() => {
    if (list.length) {
      if (status === "All") {
        setDisplayList(list);
      } else {
        setDisplayList(list.filter((item) => item.status === status));
      }
    }
  }, [status, list]);

  useEffect(() => {
    getIdeasList();
  }, []);

  if (loading) {
    return <Loading msg="Loading innovative ideas..." />;
  }

  return (
    <div className="row align-items-start my-5 ">
      <div className="col-md-3 p-2 bg-light rounded my-2 mx-auto">
        <SearchBox
          text={searchText}
          setText={setSearchText}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
        <div className="my-2">
          <h6>Filter based on Status:</h6>
          <select
            name="Status"
            id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="All">All</option>
            <option value="Planned">Planned</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {/* <div className="border-bottom">
          <Filter
            label="Tags"
            filterList={filterTagsList}
            setFilterList={setFilterTagsList}
          />
          <Filter
            label="Skills"
            filterList={filterSkillsList}
            setFilterList={setFilterSkillsList}
          />
          <Button
            onClick={handleApplyFilter}
            size="sm"
            variant="primary"
            className=" m-1"
          >
            Apply filter
          </Button>
        </div> */}
      </div>
      <div className="col-lg-8 mx-2 mx-lg-auto bg-light p-2 rounded my-2">
        <div className="mb-2 pb-1 border-bottom d-flex align-items-center justify-content-between">
          <h4>Innovative Ideas</h4>
          <Link to="/ideas/post" className="btn-info btn-sm btn">
            Post My Idea
          </Link>
        </div>
        <div>
          <DisplayIdeasList list={displayList} />
        </div>
      </div>
    </div>
  );
}

export default Ideas;
