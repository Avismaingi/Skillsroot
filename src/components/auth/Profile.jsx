import UserImg from "../../assets/img/user-img.png";
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import Loading from "../../containers/Loading";

function Profile() {
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    name: "",
    about: "",
    phone: "",
    role: "",
    image: "",
    aadhaar: "",
  });

  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result);
        } else {
          reject("Error Occurred");
        }
      });
    });
  };

  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    setUserState({
      ...userState,
      image: base64Image.toString(),
    });
  };

  let updateAadhaar = async (event) => {
    let aadhaarFile = event.target.files[0];
    let base64File = await convertBase64String(aadhaarFile);
    setUserState({
      ...userState,
      aadhaar: base64File.toString(),
    });
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    function util() {
      setLoading(true);
      if (currentUser) {
        setUserState({
          name: currentUser.name ? currentUser.name : "",
          about: currentUser.about ? currentUser.about : "",
          phone: currentUser.phone ? currentUser.phone : "",
          role: currentUser.role ? currentUser.role : "",
          image: currentUser.image ? currentUser.image : UserImg,
          aadhaar: currentUser.aadhaar ? currentUser.aadhaar : "",
        });
      }
    }
    util();
    setLoading(false);
  }, []);

  let changeInput = (event) => {
    setUserState({
      ...userState,
      [event.target.name]: event.target.value,
    });
  };

  let formSubmit = async (event) => {
    event.preventDefault();
    // console.log(userState);
    // return;
    let { name, about, phone, role, image, aadhaar } = userState;

    role = currentUser.role === "admin" ? "admin" : role;

    await database.users().doc(currentUser.id).update({
      name: name,
      about: about,
      phone: phone,
      role,
      image: image,
      aadhaar: aadhaar,
    });
    alert("Updated Successfully");
    window.location.reload();
  };

  if (loading) {
    return <Loading msg="Loading profile..." />;
  }

  return (
    <React.Fragment>
      {currentUser && (
        <section className="container mt-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <img src={userState.image} alt="" className="img-fluid" />
                </div>
                <div className="card-footer bg-light text-center">
                  <NavLink to="/updateProfile" className="text-white">
                    <div className="btn btn-primary btn-sm m-2">
                      Update Credentials
                    </div>
                  </NavLink>

                  <div
                    className="btn btn-danger text-white btn-sm m-2"
                    onClick={handleLogout}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card shadow">
                <div className="card-header text-center">
                  <h2>Profile</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={formSubmit.bind(this)}>
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Name</span>
                        <input
                          type="text"
                          onChange={changeInput.bind(this)}
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          required
                          value={userState.name}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">About</span>
                        <textarea
                          rows="1"
                          onChange={changeInput.bind(this)}
                          className="form-control"
                          placeholder="About"
                          name="about"
                          required
                          value={userState.about}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-3">
                        <span className="input-group-text">Phone</span>
                        <input
                          type="phone"
                          onChange={changeInput.bind(this)}
                          className="form-control"
                          placeholder="Mobile Number"
                          name="phone"
                          required
                          value={userState.phone}
                        />
                      </div>
                    </div>

                    {currentUser.role !== "admin" && (
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text">Role</span>
                          <select
                            className="form-control"
                            value={userState.role}
                            name="role"
                            onChange={changeInput.bind(this)}
                          >
                            <option value="employee">Employee</option>
                            <option value="trainer">Trainer</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <span className="">Upload Profile</span>

                    <div className="form-group">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          name="image"
                          onChange={updateImage.bind(this)}
                          className="form-control"
                          placeholder="Image"
                        />
                      </div>
                    </div>

                    <span className="">Upload Aadhaar</span>

                    <div className="form-group">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          name="aadhaar"
                          onChange={updateAadhaar.bind(this)}
                          className="form-control"
                          placeholder="Aadhaar"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="submit"
                        className="btn btn-success"
                        value="Save Changes"
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {userState.aadhaar && (
        <section className="container mt-5">
          <iframe src={userState.aadhaar} width="100%" height="1000px"></iframe>
        </section>
      )}
    </React.Fragment>
  );
}

export default Profile;
