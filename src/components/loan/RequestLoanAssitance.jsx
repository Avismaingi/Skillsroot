import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import UpdateAdhaarMessage from "../Home/UpdateAdhaarMessage";

function RequestLoanAssitance() {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [loan, setLoan] = useState(null);

  const handleRequestLoanAssistance = async () => {
    try {
      setLoading(true);

      await database.loans().doc(currentUser.id).set({
        aadhaar: currentUser.aadhaar,
        status: "Pending",
        phone: currentUser.phone,
        email: currentUser._delegate.email,
      });
      getUserLoanData();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getUserLoanData = async () => {
    try {
      setLoading(true);
      let doc = await database.loans().doc(currentUser.id).get();

      if (doc.exists) {
        doc = database.formatDocument(doc);
        setLoan(doc);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUserLoanData();
    }
  }, [currentUser]);

  if (loading) {
    return <Loading msg="Loading..." />;
  }

  return (
    <CenteredContainer>
      <div className="card p-0">
        <div className="card-header">
          <h4 className="text-center">Request Loan Assistance</h4>
        </div>
        <div className="text-center card-body">
          {!currentUser.aadhaar ? (
            <>
              <UpdateAdhaarMessage />
              <Link to="/profile" className="mt-2">
                Go to profile settings
              </Link>
            </>
          ) : (
            loan === null && (
              <button
                disabled={!currentUser.aadhaar}
                className="btn btn-primary btn-block"
                onClick={handleRequestLoanAssistance}
              >
                Request
              </button>
            )
          )}
          {loan !== null && (
            <p>
              Status: <span className="text-danger">{loan.status}</span>
            </p>
          )}
        </div>
      </div>
    </CenteredContainer>
  );
}

export default RequestLoanAssitance;
