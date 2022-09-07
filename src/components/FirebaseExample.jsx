import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

function FirebaseExample() {
  const { currentUser } = useAuth();
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const inputRef = useRef();

  const addValue = async () => {
    if (!inputRef.current.value) return;
    console.log(inputRef.current.value);
    await database
      .todos()
      .add({ name: inputRef.current.value, uid: currentUser.uid });
    window.location.reload();
  };

  const editValue = async () => {
    if (!inputRef.current.value) return;
    console.log(inputRef.current.value);
    await database
      .todos()
      .doc(editingId)
      .update({ name: inputRef.current.value });
    setEditingId(null);
    // window.location.reload();
  };

  const deleteValue = async (id) => {
    await database.todos().doc(id).delete();
    // window.location.reload();
  };

  const editInput = (name, id) => {
    inputRef.current.value = name;
    setEditingId(id);
  };

  const alertTodo = async (id) => {
    let doc = await database.todos().doc(id).get();
    doc = database.formatDocument(doc);
    // console.log(doc);
    alert(`Name:${doc.name}, ID:${doc.id}`);
  };

  useEffect(() => {
    // Get items associated with current user
    const getUserValues = async () => {
      let data = await database
        .todos()
        .where("uid", "==", currentUser.uid)
        .get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      console.log(data);
      setList(data);
    };
    getUserValues();

    // Get All
    // const getValues = async () => {
    //   let data = await database.todos().get();
    //   data = data.docs.map((doc) => database.formatDocument(doc));
    //   console.log(data);
    //   setList(data);
    // };
    // getValues();

    // return database
    //   .todos()
    //   .where("uid", "==", currentUser.uid)
    //   .onSnapshot((snapshot) => {
    //     const data = snapshot.docs.map((doc) => database.formatDocument(doc));
    //     setList(data);
    //   });
  }, []);

  //   useEffect(() => {
  // Creating non-existing user
  //     database
  //       .users()
  //       .doc(currentUser.uid)
  //       .get()
  //       .then((doc) => {
  //         console.log("-----TEST DOC-----", doc);
  //         if (!doc.exists) {
  //           database.users().doc(currentUser.uid).set({
  //             email: currentUser.email,
  //             role: "Admin",
  //           });
  //         }
  //       });
  //   }, []);

  return (
    <div>
      FirebaseExample
      <br />
      {/* <button onClick={getValues} className="my-2 btn btn-primary btn-sm">
        Get data
      </button> */}
      <div>
        <input type="text" ref={inputRef} className="form-control" />
        <button onClick={addValue} className="my-2 btn btn-secondary btn-sm">
          Add
        </button>
        <button onClick={editValue} className="my-2 btn btn-secondary btn-sm">
          Edit
        </button>
      </div>
      <ul className="list-group">
        {list.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center justify-content-between"
            onClick={() => alertTodo(item.id)}
          >
            {item.name}
            <div className="ml-auto">
              <button
                onClick={() => editInput(item.name, item.id)}
                className="my-2 btn btn-warning btn-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteValue(item.id)}
                className="ml-2 my-2 btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FirebaseExample;
