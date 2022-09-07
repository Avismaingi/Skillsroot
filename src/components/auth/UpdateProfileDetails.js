import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";


let UpdateProfileDetails = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser} = useAuth();
  const navigate = useNavigate();
  const [userState,setUserState] = useState({
     name:"",
     about:"",
     phone:"",
     address:{
      flat:"",
      street:"",
      city:"",
      pincode:"",
      state:""
     }
  });

  useEffect(()=>{
    function util(){
      if(currentUser){
        setUserState({
          name:(currentUser.name)?currentUser.name:"",
          about:(currentUser.about)?currentUser.about:"",
          phone:(currentUser.phone)?currentUser.phone:"",
          role:(currentUser.role)?currentUser.role:"",
        });
      }
    }
    util();
  },[])

  let changeInput = (event)=>{
      setUserState({
        ...userState,
        [event.target.name]:event.target.value
      })
  }

 

  let formSubmit = async(event)=>{
    event.preventDefault();
    let {name,about,phone,role} = userState;
    await database
    .users()
    .doc(currentUser.id)
    .update({name:name,about:about,phone:phone,role:role});
    navigate("/profile")
  }







  return(
    <React.Fragment>
      <section className="mt-5">
        <form onSubmit={formSubmit.bind(this)}>

        <div className='form-group'>
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


        <div className='form-group'>
            <div className="input-group mb-3">
                <span className="input-group-text">About</span>
                <textarea rows="1"
                onChange={changeInput.bind(this)}
                className="form-control"
                placeholder="About"
                name="about"
                required
                value={userState.about}
              />
            </div>
        </div>



        <div className='form-group'>
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
      

        <div className='form-group'>
            <div className="input-group mb-3">
                <span className="input-group-text">Role</span>
                <select className="form-control" name="role" onChange={changeInput.bind(this)}>
                  <option value="learner">Learner</option>
                  <option value="trainer">Trainer</option>
                  <option value="recruiter">Recruiter</option>
                </select>
            </div>
        </div>
        

       
            


          

            

            <div>
              <input type="submit" className="btn btn-success" value="Update">

              </input>
            </div>

           

        </form>
      </section>

    </React.Fragment>
  )
}

export default UpdateProfileDetails;
