
import { React, useState, useEffect } from "react";
import {  NavTab } from "react-router-tabs";

import axios from "axios";


   
function Address(props){
    
    

    
    
    let userType=JSON.parse(localStorage.getItem('userdata')).userType
    let addAddress=JSON.parse(localStorage.getItem('add address'))
    const[houseNo,changeHouseNo]=useState("")
    const[locality,changelocality]=useState("")
    const[pinCode,changepinCode]=useState("")
    const[city,changecity]=useState("")
    const[state,changeState]=useState("")
    // eslint-disable-next-line
    const [address,changeAddress]=useState([])
    // eslint-disable-next-line
    const[userT,changeuserT]=useState(userType)
    // eslint-disable-next-line
    
    
    const [addresschecked, addresschangeChecked] = useState(false);
    let filteredcontent = address.filter(ele=>ele.emailD===JSON.parse(localStorage.getItem('userdata')).userEmailID)
    useEffect( function get() {  
        axios.get("https://bookstorebackend14.herokuapp.com/api/address").then(response=>
        changeAddress(response.data));
       })
function handleSubmit(e){
    e.preventDefault();
    let email=JSON.parse(localStorage.getItem('userdata')).userEmailID
    
    axios({
      method: "post",
      url: "https://bookstorebackend14.herokuapp.com/api/address",
      data: {
        emailD:email,
        houseNO:houseNo,
        locality:locality,
        city:city,
        state:state,
        pinCode:pinCode,
        userType:userT
        
      },
    })
    .then(()=>{
      changeHouseNo("");
      changeState("");
      changecity("");
      changelocality("")
      changepinCode("")
    
      alert("Address Added")})
    
    

  }
  function checkAddress(){
    if(!addresschecked){
        addresschangeChecked(!addresschecked);
      }
  }
  function changeHandler(e){
    let value = e.target.value;
    if (e.target.name === "houseNo") {
      changeHouseNo(value);
      
    }
    if (e.target.name === "locality") {
      changelocality(value);
      
    }
    if (e.target.name === "pinCode") {
      changepinCode(value);
      
    }

    if (e.target.name === "city") {
      changecity(value);
      
    }

    if (e.target.name === "state") {
      changeState(value);
      
    }

  }
  return(<div className="container-fluid">
  <div className="card mt-2 border-success mb-5">
<div className="card-group mb-4">
  
  <div className="  address p-0 mt-3" >
       <div className="card-header"><h2 className="text-center">Address</h2></div>
        <div className="card-body">
        <div >
          <form className="form-horizontal p-2 " onSubmit={handleSubmit} >
         
            
        
    <div className="form-group row ">
        <label className="col-form-label col-12 col-lg-4 ">House No</label>
        <div className="col-12 col-sm-8">
            <input type="text" onChange={changeHandler} className="form-control" name="houseNo" value={houseNo} required="required"/>
        </div>          
    </div>
    <div className="form-group row mt-3">
        <label className="col-form-label col-12 col-lg-4">Locality</label>
        <div className="col-12 col-sm-8">
            <input type="text" onChange={changeHandler} className="form-control" name="locality" value={locality} required="required"/>
        </div>          
    </div>
    <div className="form-group row mt-3">
        <label className="col-form-label col-12 col-lg-4">City</label>
        <div className="col-12 col-sm-8">
            <input type="text" onChange={changeHandler} className="form-control" name="city" value={city} required="required"/>
        </div>          
    </div>
    <div className="form-group row mt-3">
        <label className="col-form-label col-12 col-lg-4">State</label>
        <div className="col-12 col-sm-8">
            <input type="text" onChange={changeHandler} className="form-control" name="state" value={state}  required="required"/>
            
        </div>          
    </div>
    <div className="form-group row mt-3">
        <label className="col-form-label col-12 col-lg-4">PinCode </label>
        <div className="col-12 col-sm-8">
            <input type="text" onChange={changeHandler} className="form-control" name="pinCode" required="pinCode" value={pinCode} placeholder="131313"  maxLength="6" />
        </div>          
    </div>

    <div className="form-group row mt-3">
        <div className="col">
    
         <button type="submit" onSubmit={handleSubmit} className="btn btn-primary text-center mt-3">Submit </button>
       
        </div>  
    </div>            
</form>
         </div>
        </div>
        
  </div>

<div className="  address p-0 mt-3">
    {(filteredcontent.length>0)&&(addAddress===false)&&(<div className="card">
        <div className="card-header text-center"><h2>Saved Address</h2></div>
{
                     filteredcontent.map((ele,key)=>(
                         <div  className="card-body  p-2" style={{height:"52px"}}>
                             <div key={ele._id} className="form-check my-auto">
                             <input type="radio" className="form-check-input" onClick={checkAddress} id={key} name="addresses"/>
                             <label htmlFor={key} className="form-check-label">{ele.houseNO}, {ele.locality}, {ele.city}, {ele.state}-{ele.pinCode}</label>
                             </div>
                            
                             
                         </div>
                     ))
                }</div>)}
</div>

</div>
<div className="card-footer">
      {(addresschecked===true) && (
        <div>
          <NavTab
            className="float-start btn btn-primary"
            
            to="/payment/CreditCard"
          >
            Proceed to Payment Gateway
          </NavTab>

        
        </div>
      )}
    </div>
</div>
</div>
);

}
export default Address;