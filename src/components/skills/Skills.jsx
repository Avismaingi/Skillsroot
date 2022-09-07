import React, { useEffect, useRef, useState } from "react";
import { database } from '../../firebase';
import { useAuth } from "../../contexts/AuthContext";
import './Skills.css';
import SearchBox from "./SearchBox";



function Skills() {

  const { currentUser } = useAuth();
  const [list, setList] = useState([]);
  const content = useRef();
  const refernce = useRef();
  const text = useRef();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const addValue = async (event) => {
    event.preventDefault();
    if (!content.current.value) return;
    // console.log(content.current.value);
    await database
      .resources()
      .add({ Content: content.current.value, Reference: refernce.current.value, Text: text.current.value });
    window.location.reload();
  };


  useEffect(() => {
    const getUserValues = async () => {
      let data = await database.resources().get();//get all documents from specific collection
      data = data.docs.map((doc) => database.formatDocument(doc));
      // console.log(data);
      setList(data);
    };
    getUserValues();
  }, [database, searchText])

  const clearSearch = () => {
    setSearchText("");
    setList(list);
  };

  const handleSearch = () => {
    if (!searchText) {
      setList(list);
      return;
    }

    const searchList = list.filter((item) =>
      item.Content.toLowerCase().includes(searchText.toLowerCase())
    );

    setList(searchList);
  };

  var well={
    boxShadow: "1px 3px 1px #9E9E9E"
  }

  return (
    <div className="container" >
      {(currentUser.role === "trainer" || currentUser.role === "admin") &&
        <div className="container2 my-3 mx-5" style={{ padding: "20px" }}>
          <h3>Enter Resources</h3>
          <input type="text" placeholder="Content" style={{ width: "100%", paddingLeft: "8px", paddingTop: "6px", paddingBottom: "6px", }} ref={content} className="form-control" />
          <br></br>
          <input type="text" placeholder="Reference" style={{ width: "100%", paddingLeft: "8px", paddingTop: "6px", paddingBottom: "6px", }} ref={refernce} className="form-control" />
          <br></br>
          <input type="text" placeholder="Text" style={{ width: "100%", paddingLeft: "8px", paddingTop: "6px", paddingBottom: "6px", }} ref={text} className="form-control" />
          <br></br>
          <button type="button" className="btn btn-primary" style={{ width: "10%", paddingLeft: "8px", paddingTop: "6px", paddingBottom: "6px", }} onClick={addValue}>POST</button>
        </div>
      }
      <div className="leftbox1 my-3 mx-5" style={{float:"left",height:"0px",marginTop:0}}>
        <br></br><br></br>
        <div className="row align-items-start my-1 ">
          <div className="container-fluid ">
            <SearchBox
              text={searchText}
              setText={setSearchText}
              handleSearch={handleSearch}
              clearSearch={clearSearch}
            />
          </div>
        </div>
      </div>
      <div className="rightbox row my-3 align-items-start" style={{float:"right",marginLeft: "500px",}}>
        <div className="container">
          <div className="card__container">
            {list.map((item) => {
              return (
              <div className="card my-4 mx-5" style={{padding:"20px",textAlign: 'justify',width:"90%",backgroundColor: '#f5f5f5', boxShadow: "1px 3px 2px #9E9E9E"}}>
                  <h3 className="card__header">{item.Content}</h3>
                  <p className="card__info">{item.Text}</p>
                  <div className="btn-group">
                    <a href={item.Reference}>
                      <button className="btn btn-dark">Reference</button>
                    </a>
                    <br></br><br></br>
                  </div>
                </div>
            )})}
          </div>
        </div>
      </div>
    </div>

  )
}


export default Skills;
