import React, { useState } from "react";
import {  NavTab } from "react-router-tabs";
import {BrowserRouter as Router,Switch,Route } from "react-router-dom";
import axios from "axios";
import CreditCard from './creditCard'
import DebitCard from './debitCard';
import GooglePay from './googlePay';
import NetBanking from './NetBanking'

function Payment(props) {
 const total=localStorage.getItem("total")
  let userType=JSON.parse(localStorage.getItem('userdata')).userType
  
  // eslint-disable-next-line
  const [totalAll,setTotal]=useState(total)
  const [checked, changeChecked] = useState(false);
  
  function check() {
    if(!checked){
    changeChecked(!checked);
      alert("Payment mode selected")
      
  }
  }
 

  function remove() {

    let email=JSON.parse(localStorage.getItem('userdata')).userEmailID
    
    let x=localStorage.getItem("cart")
  
    axios({
      method:"post",
      url:'https://bookstorebackend14.herokuapp.com/api/orders',
      data:{
        emailID:email,
        order:JSON.parse(x)

    }});
    axios.delete(`https://bookstorebackend14.herokuapp.com/api/selectedProductsAll/${email}`);

  }

  return (
    <div className="container-fluid">
      <div className="card w-100 border border-2 mt-2 border-success mb-5">
    
      <div className="w-75 m-auto mt-3 mx-5 p-0 card border-success ">
        <div className="card-header float-start fs-3 ">
          Payment <p className="float-end"> Total : ₹ {totalAll}</p>
        </div>
        <div className="card-body p-3">
        <Router>
      <div>
      <ul className="mb-3 nav nav-pills nav-justified">
  <li className="nav-item">
  <NavTab className="nav-link nvlink " to="/payment/GooglePay">UPI</NavTab>
    
  </li>
  <li className="nav-item">
  <NavTab className="nav-link nvlink" to="/payment/CreditCard">CreditCard <i className="bi bi-credit-card-2-back-fill "></i></NavTab>
    
  </li>
  <li className="nav-item">
  <NavTab className="nav-link nvlink" to="/payment/Debit">Debit <i className="bi bi-credit-card-2-back-fill "></i></NavTab>
    
  </li>
  <li className="nav-item">
  <NavTab className="nav-link nvlink" to="/payment/NetBanking">Internet Banking <i className="bi bi-laptop "></i></NavTab>
    
  </li>
</ul>












        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            

          <Route exact path="/payment/CreditCard">
            <CreditCard tot={total} Tochecked={check} />
          </Route>
          <Route path="/payment/Debit">
            <DebitCard tot={total}  Tochecked={check}/>
          </Route>
          <Route path="/payment/GooglePay">
            <GooglePay tot={total}  Tochecked={check}/>
          </Route>
          <Route path="/payment/NetBanking">
            <NetBanking tot={total} Tochecked={check} />
          </Route>
        </Switch>
      </div>
    </Router>
        </div>

      
      </div>
      
    
    <div className="card-footer">
          {(checked===true) && (
            <div>
              <NavTab
                className="float-start btn btn-primary"
                onClick={remove}
                to="/thankYou"
              >
                Proceed to Pay
              </NavTab>

              <NavTab className="float-end btn btn-primary" to="/home">
                Shop More
              </NavTab>
            </div>
          )}
        </div>
    </div>
    </div>
  );
}

export default Payment;
