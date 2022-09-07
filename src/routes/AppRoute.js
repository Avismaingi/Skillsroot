import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import Profile from "../components/auth/Profile";
import Signup from "../components/auth/Signup";
import UpdateProfile from "../components/auth/UpdateProfile";
import Home from "../components/Home";
import Ideas from "../components/Ideas";
import { useAuth } from "../contexts/AuthContext";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";
import FirebaseExample from "../components/FirebaseExample";
import UpdateProfileDetails from "../components/auth/UpdateProfileDetails";
import PostMyIdea from "../components/Ideas/PostMyIdea";
import Skills from "../components/skills/Skills";
import ViewIdea from "../components/Ideas/ViewIdea";
import MyIdeas from "../components/Ideas/ViewIdea/MyIdeas";
import Event from "../components/Events";
import PostEvent from "../components/Events/PostEvent";
import MyCollaborations from "../components/Ideas/ViewIdea/MyCollaborations";
import Admin from "../components/Admin";
import UpdateAdhaarMessage from "../components/Home/UpdateAdhaarMessage";
import RequestLoanAssitance from "../components/loan/RequestLoanAssitance";
import Registration from "../components/Events/Registration";

function AppRoute() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      {currentUser &&
        currentUser.role !== "admin" &&
        currentUser.role === "trainer" &&
        currentUser.aadhaar === "" && <UpdateAdhaarMessage />}
      <Routes>
        {/* Home-Welcome to our page */}
        <Route path="/" element={<Home />} />
        {/*Example  */}
        <Route
          path="/example"
          element={
            <AuthRoute>
              <FirebaseExample />
            </AuthRoute>
          }
        />

        {/*Admin  */}
        <Route
          path="/admin"
          element={
            <AuthRoute>
              <Admin />
            </AuthRoute>
          }
        />

        <Route
          path="/request-loan-assistance"
          element={
            <AuthRoute>
              <RequestLoanAssitance />
            </AuthRoute>
          }
        />

        {/*Ideas  */}
        <Route path="ideas">
          <Route
            path=""
            element={
              <AuthRoute>
                <Ideas />
              </AuthRoute>
            }
          />
          <Route
            path="post"
            element={
              <AuthRoute>
                <PostMyIdea />
              </AuthRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthRoute>
                <ViewIdea />
              </AuthRoute>
            }
          />
        </Route>
        <Route path="workshop">
          <Route
            path=""
            element={
              <AuthRoute>
                <Event />
              </AuthRoute>
            }
          />
          <Route
            path="post"
            element={
              <AuthRoute>
                <PostEvent />
              </AuthRoute>
            }
          />
          <Route
            path="details/:id"
            element={
              <AuthRoute>
                <Registration />
              </AuthRoute>
            }
          />
        </Route>

        {/* User profile */}
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <AuthRoute>
              <UpdateProfile />
            </AuthRoute>
          }
        />
        {/* {Learn Section} */}

        <Route
          path="/learn-skills/resources"
          element={
            <AuthRoute>
              <Skills />
            </AuthRoute>
          }
        />

        <Route
          path="/myIdeas"
          element={
            <AuthRoute>
              <MyIdeas />
            </AuthRoute>
          }
        />

        <Route
          path="/myCollaborations"
          element={
            <AuthRoute>
              <MyCollaborations />
            </AuthRoute>
          }
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        {/* Redirect */}

        {!currentUser ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/ideas" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default AppRoute;
