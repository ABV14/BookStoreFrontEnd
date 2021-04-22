import { React, useState } from "react";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../store.js";
import axios from "axios";
function AdminDashboard(props) {
  const globalState = useContext(store);
  let x = localStorage.getItem("userdata");
  let emailID = JSON.parse(x).userEmailID;
  let userName = JSON.parse(x).userName;
  let userType = JSON.parse(x).userType;
  
  let history = useHistory();

  const [oldP, changeOldP] = useState("");
  const [newP, changeNewP] = useState("");
  const [CnewP, changeCNewP] = useState("");
  const [userNew, changeNewUser] = useState(userName);
  const [errors, changeError] = useState("");
  function PasswordChange(e) {
    let value = e.target.value;
    if (e.target.name === "oldPassword") {
      changeOldP(value);
      
    }
    if (e.target.name === "newPassword") {
      changeNewP(value);
      
    }
    if (e.target.name === "confirmnewPassword") {
      changeCNewP(value);
      
    }

    if (e.target.name === "name") {
      changeNewUser(value);
     
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (validate()) {
      axios({
        method: "post",
        url: "https://bookstorebackend14.herokuapp.com/api/changePassword",
        data: {
          userName: userNew,
          userEmailID: emailID,
          password: oldP,
          newPassword: newP,
          userType: userType,
        },
      }).then((res) => {
        alert(res.data.message);
        changeNewP("");
        changeOldP("");
        changeNewUser("");
        changeCNewP("");
      });
    }
    
  }

  function validate() {
    // let errors = {};
    let isValid = true;

    if (typeof CnewP !== "undefined" && typeof newP !== "undefined") {
      if (CnewP !== newP) {
        isValid = false;
        changeError("Passwords don't match.");
      }
    }

    return isValid;
  }

  if (x !== null)
    return (
      <div className="container  mt-1  mx-auto p-auto" style={{margin: "100px"}}>
      
        <div className="text-center card border-dark border p-0 border-2  shadow mt-5 mb-5 w-75  m-auto">
          <h1>Welcome Admin </h1>
          <h1>
            Mr.
            {JSON.parse(localStorage.getItem("userdata"))
              .userName.charAt(0)
              .toUpperCase() +
              JSON.parse(localStorage.getItem("userdata")).userName.slice(1)}
          </h1>
          <div className="card-footer">
            <div className="row">
              <div className="col-12 col-sm-6">
                <button
                  className="text-center btn btn-success m-3 "
                  onClick={() => history.push("/AdminRegistration")}
                >
                  Enroll a new Admin{" "}
                </button>
              </div>

              <div className="col-12 col-sm-6">
                <button
                  className="text-center btn btn-danger m-3"
                  onClick={signout}
                >
                  Sign Out{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-5 ">
          <div className="card border-success p-0 border border-2  col-12 col-sm-6">
            <div className="card-header fw-bold">Details</div>
            <div className="card-body p-3">
              <div>
                𝐍𝐚𝐦𝐞: {JSON.parse(localStorage.getItem("userdata")).userName}
              </div>
              <div>
                𝐞𝐦𝐚𝐢𝐥𝐈𝐃:
                {JSON.parse(localStorage.getItem("userdata")).userEmailID}
              </div>
              <div>
                𝐏𝐫𝐢𝐯𝐢𝐥𝐢𝐠𝐞:{" "}
                {JSON.parse(localStorage.getItem("userdata")).userType}
              </div>
            </div>
            <div className="card-footer"></div>
          </div>

          <div className="card border-primary p-0 border border-2  col-12 col-sm-6">
            <div className="card-header fw-bold">Change Password</div>
            <div className="card-body p-3">
              To Change username/password click on the button
              <button
                type="button"
                className="btn btn-primary mx-3 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Change password
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Change Password
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <label className="col-form-label col-12 col-sm-4 ">
                          Username{" "}
                        </label>
                        <div className="col-12 col-sm-8">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            onChange={PasswordChange}
                            value={userNew}
                            required
                          />
                        </div>

                        <label className="col-form-label col-12 col-sm-4 ">
                          Old Password{" "}
                        </label>
                        <div className="col-12 col-sm-8">
                          <input
                            type="text"
                            id="oldPassword"
                            name="oldPassword"
                            className="form-control"
                            onChange={PasswordChange}
                            value={oldP}
                            required
                          />
                        </div>
                        <label className="col-form-label col-12 col-sm-4 ">
                          New Password{" "}
                        </label>
                        <div className="col-12 col-sm-8">
                          <input
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            className="form-control"
                            onChange={PasswordChange}
                            value={newP}
                            required
                          />
                        </div>

                        <label className="col-form-label col-12 col-sm-4 ">
                          Confirm Password{" "}
                        </label>
                        <div className="col-12 col-sm-8">
                          <input
                            type="text"
                            id="confirmnewPassword"
                            name="confirmnewPassword"
                            className="form-control"
                            onChange={PasswordChange}
                            value={CnewP}
                          />
                        </div>
                        <div className="text-danger">{errors}</div>

                        <button type="submit" className="btn btn-primary mt-3">
                          Change Password
                        </button>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    );
  else {
    return <Redirect to="/Login"></Redirect>;
  }
  function signout() {
    localStorage.clear();
    const { dispatch } = globalState;

    dispatch({
      type: "action description",
      payload: ["", "Login", "Register","Cart"],
    });
    history.push("/Login");
  }
}

export default AdminDashboard;
