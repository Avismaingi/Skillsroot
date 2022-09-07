import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function Admin() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const getUserLoanList = async () => {
    try {
      setLoading(true);
      let data = await database.loans().get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      setList(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLoan = async (id) => {
    try {
      setLoading(true);
      await database.loans().doc(id).update({ status: "Approved" });
      getUserLoanList();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleOpenDoc = (doc) => {
    // console.log(doc);
    window.open(doc);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role !== "admin") {
        navigate("/ideas", { replace: true });
      } else {
        getUserLoanList();
      }
    }
  }, [currentUser]);

  if (loading) {
    return <Loading msg="Loading loan lists..." />;
  }

  return (
    <div className="row my-5 bg-light p-2">
      <div className="col-md-7 mx-auto">
        <h4 className="text-center">Help with Loan Assistance</h4>
        <hr />
      </div>
      <div className="col-md-6 mx-auto">
        <ul className="list-group">
          {list?.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span>Email: {item.email}</span> <br />
                  <span>Phone: {item.phone}</span> <br />
                  <span
                    target="_blank"
                    rel="noreferrer"
                    // href={item.aadhaar}
                    onClick={() => handleOpenDoc(item.aadhaar)}
                    className="text-primary"
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Aadhaar Card Document
                  </span>
                </div>
                <button
                  className="btn btn-sm my-2 btn-dark"
                  onClick={() => handleApproveLoan(item.id)}
                  disabled={item.status === "Approved"}
                >
                  {item.status === "Approved" ? "Approved" : "Approve"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
