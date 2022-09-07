import React, { useEffect, useState, useContext } from "react";
import Loading from "../containers/Loading";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    return auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        let data = await database.users().doc(_user.uid).get();
        if (data.exists) {
          data = database.formatDocument(data);
          setCurrentUser({ ..._user, ...data });
          setLoading(false);
        } else {
          const newUser = {
            role: "employee",
            name: "",
            phone: "",
            about: "",
            image: "",
            aadhaar:""
          };
          await database.users().doc(_user.uid).set(newUser);
          newUser.id = _user.uid;
          setCurrentUser({ ..._user, ...newUser });
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    // return auth.onAuthStateChanged((user) => {
    //   console.log("USER: ", user);
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ marginTop: "7vh" }}>
          <Loading msg="Checking auth..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
