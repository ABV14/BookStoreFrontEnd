import {React,useState} from "react";
import axios from 'axios'

import { useHistory } from "react-router-dom";


function Registration (){

    const[userName,changeuserName]=useState("")
    const[userEmailID,changeuserEmailID]=useState("")
    const[password,changePassword]=useState("")
    const[phoneNo,changePhoneno]=useState("")
    const[confirmPassword,changeConfirmPassword]=useState("")
    const[errors,changeError]=useState("")
    let history = useHistory();
   
      function changeHandler(event) {
          
        let name = event.target.name;
        let value = event.target.value;
            if(name==="userName")
      {
            changeuserName(value)
      }
            if(name==="userEmailID")
            {
                changeuserEmailID(value)
            }
            if(name==="password"){
                changePassword(value)
            }
            if(name==="phoneNo")
            {
                changePhoneno(value)
            }
            if(name==="confirmPassword"){
              changeConfirmPassword(value)
            }
        
      }
    
     function handleSubmit(event) {
        event.preventDefault();
        
       if(validate()){
        let d = new Date();
       
        let createdOn =d.toDateString();
        axios({
            method: "post",
            url: "https://bookstorebackend14.herokuapp.com/api/register",
            data: {
              userName:userName,
              userEmailID: userEmailID,
              password: password,
              phoneNo:phoneNo,
              createdOn:createdOn,
              userType: "Customer",
            },
        }
        ).then(res=>
        {
     
        alert(res.data)
        history.push('/Login')
    } )
  }
      }
      function validate(){
        // let errors = {};
        let isValid = true

        if (typeof password!== "undefined" && typeof confirmPassword!== "undefined") {
          
          if (password !== confirmPassword) {
            isValid = false;
            changeError("Passwords don't match.");
          }
        } 

        return isValid







      }

        return (
            <div className="p-0 " style={{width: "100%",height:"50rem",
            margin: "0 auto",
            }}>
            <div className="card my-5 p-3 shadow w-50" style={{
            margin: "0 auto",
            padding: "30px 0"}}>
    <form className="form-horizontal " onSubmit={handleSubmit} >
        <div className="row mt-3">
            <div className="col">
                <h2 className="text-center"> Shop with Us  ?</h2>
                <h2 className="text-primary text-center"> Sign Up Now</h2>
            </div>  
        </div>          
        <div className="form-group row mt-5">
            <label className="col-form-label col-12 col-sm-4 ">Username</label>
            <div className="col-12 col-sm-8">
                <input type="text" onChange={changeHandler} className="form-control" name="userName" value={userName} required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Email Address</label>
            <div className="col-12 col-sm-8">
                <input type="email" onChange={changeHandler} className="form-control" name="userEmailID" value={userEmailID} required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Password</label>
            <div className="col-12 col-sm-8">
                <input type="password" onChange={changeHandler} className="form-control" name="password" value={password} required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Confirm Password</label>
            <div className="col-12 col-sm-8">
                <input type="password" onChange={changeHandler} className="form-control" name="confirmPassword" value={confirmPassword}  required="required"/>
                <div className="text-danger">{errors}</div>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Mobile Number </label>
            <div className="col-12 col-sm-8">
                <input type="tel" onChange={changeHandler} className="form-control" name="phoneNo" required="required" value={phoneNo} placeholder="12345-12345"  pattern="[0-9]{5}-[0-9]{5}" />
            </div>          
        </div>
  
        <div className="form-group row mt-3">
            <div className="col">
                <p><label className="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="/terms">Terms of Use</a> &amp; <a href="/policy">Privacy Policy</a>.</label></p>
             <button type="submit" onSubmit={handleSubmit} className="btn btn-primary btn-lg mt-3">Sign Up</button>
           
            </div>  
        </div>            
    </form>
    <div className="text-center mt-5">Already have an account? <a href="/Login">Login here</a></div>
</div> 
</div>
        );
    
}

export default Registration;