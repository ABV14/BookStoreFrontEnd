
import { useContext } from "react";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../store.js";
import axios from "axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  // const [address, setAddress] = useState({});
  const globalState = useContext(store);
  let x = localStorage.getItem("userdata");
  let emailID = JSON.parse(x).userEmailID;
  let userType = JSON.parse(x).userType;
  let userName = JSON.parse(x).userName;

  let history = useHistory();
  // eslint-disable-next-line
   useEffect( function get() {  
    axios.get("https://bookstorebackend14.herokuapp.com/api/orders").then(response=>
    setOrders(response.data));
   }
   )
  
   const [address,changeAddress]=useState([])
  const [oldP, changeOldP] = useState("");
  const [newP, changeNewP] = useState("");
  const [CnewP, changeCNewP] = useState("");
  const [userNew, changeNewUser] = useState(userName);
  const [errors, changeError] = useState("");
  let filteredcontent = address.filter(ele=>ele.emailD===JSON.parse(localStorage.getItem('userdata')).userEmailID)

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

function addressExtract(){
  axios.get("https://bookstorebackend14.herokuapp.com/api/address").then(response=>
  changeAddress(response.data));
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

  let filter = orders.filter((item) => {
    return (
      item.emailID === JSON.parse(localStorage.getItem("userdata")).userEmailID
    );
  });
  if (x !== null)
    return (
      <div className="container  mx-auto  mt-1  p-auto" style={{margin: "100px"}}>
          <h1 className="text-center">Welcome </h1>
          <div className="card-group m-3">
        <div className="card border-success border border-2 h-100 shadow ">
        <div className="card-header">User Details</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 pe-1 col-sm-3">
              <img className="card-img w-100 pe-1 m-auto" alt="profile pic" src="https://images-na.ssl-images-amazon.com/images/I/51Z9p5AecCL._SX307_BO1,204,203,200_.jpg"></img>
            </div>
            <div className="col-12 pe-1 col-sm-9">
          <p > 
          <span className="fw-bold">Name: </span> 
            {JSON.parse(localStorage.getItem("userdata"))
              .userName.charAt(0)
              .toUpperCase() +
              JSON.parse(localStorage.getItem("userdata")).userName.slice(1)}
          </p>
          <p>
           <span className="fw-bold">EmailID: </span> 
            {JSON.parse(localStorage.getItem("userdata"))
              .userEmailID}
          </p>
          <p>
           <span className="fw-bold">Mobile No: </span> 
            {JSON.parse(localStorage.getItem("userdata"))
              .phoneNo}
          </p>
          
          <p>
           <span className="fw-bold">Created On: </span> 
            {JSON.parse(localStorage.getItem("userdata"))
              .createdOn}
          </p>
          
          </div>
          </div>
          </div>
          <div className="card-footer">
            
              {/* <div className="col-12 col-sm-6">
          </div> */}

              <div>
                <button
                  className="text-center btn btn-danger m-3"
                  onClick={signout}
                >
                  Sign Out{" "}
                </button>
              
            </div>
          </div>
        </div>
      
          <div className="card w-100 h-100 border-info border border-3 ">
            <div className="card-header fw-bold">Orders</div>
            <div className="card-body p-3">

          
            <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed btn-success" onClick={addressExtract} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne1" aria-expanded="false" aria-controls="flush-collapseOne">
       Click to View Addressess
      </button>
    </h2>
    <div id="flush-collapseOne1" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
        
             {(filteredcontent.length>0)&&(<div className="card m-0">
        
{
  <div className="card-body p-0">
                    { filteredcontent.map((ele,key)=>(
                       <div>
                       <p htmlFor={key} className="">{ele.houseNO}, {ele.locality}, {ele.city}, {ele.state}-{ele.pinCode}</p>
                       <hr></hr>  
                       </div>
                           
                
                             
                             
                         
                     ))}
                     </div>
                }</div>)}
              
      </div>
    </div>
  
            </div>




            <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       Click to View orders
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
        
              {filter.length === 0 ? (
                <p>No orders yet</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <td>Order.no</td>
                      <td>BOOKS</td>
                  
                    </tr>
                  </thead>
                  <tbody>
                    {filter.map((ele, key) => (
                      <tr key={ele._id}>
                        <td>
                          <div >{key + 1}</div>
                        </td>
                        <td>
                          {ele.order.map((el) => (
                            <div key={el._id}><p className="fw-bold">{el.bookName}</p>
                            <hr></hr>
                            </div>
                          ))}
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
      </div>
    </div>
  
            </div>
            </div>
          
            <div className="card-footer"></div>
            </div>
          <div className="card border-secondary  h-100 w-100 border border-3">
            <div className="card-header fw-bold">Change Password</div>
            <div className="card-body p-3">
              <div>
                To Change the Username/Password click on the button
              <button
                type="button"
                className="btn btn-primary text-center mx-3 mt-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Change password
              </button>
              </div>
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
                            required
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
              <div>
             <p className="mt-3">To Add Address click here</p>
            <button className="btn btn-success" onClick={()=>{
              history.push("/address")
              localStorage.setItem("add address",true)
              }}>Add Address</button>
             </div>
            </div>
            <div className="card-footer"></div>
          </div>
        
      </div>
      </div>
    );
 
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

export default Dashboard;
