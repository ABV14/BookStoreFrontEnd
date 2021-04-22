import React, { Component } from "react";
import axios from 'axios'



class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { userName: "", userEmailID: "", password: "", phoneNo: "" };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      changeHandler(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        this.setState({userType:'Admin' })   
      }
    
      handleSubmit(event) {
        event.preventDefault();
             
        
        let data=this.state
        axios.post("https://bookstorebackend14.herokuapp.com/api/register",data).then(res=>
        {
        this.setState({userName: "",userEmailID: "", password: "", phoneNo: "" });
        alert("Admin created Successfully")
        
    }
    
        )
        
      }
    render() {
        return (
            <div className="p-0 " style={{width: "100%",height:"50rem",
            margin: "0 auto",
            }}>
            <div className="card my-5 p-3 shadow w-50" style={{
            margin: "0 auto",
            padding: "30px 0"}}>
    <form className="form-horizontal " onSubmit={this.handleSubmit} >
        <div className="row mt-3">
            <div className="col">
                <h2 className="text-center">Admin Enrollment </h2>
                
            </div>  
        </div>          
        <div className="form-group row mt-5">
            <label className="col-form-label col-12 col-sm-4 ">Username</label>
            <div className="col-12 col-sm-8">
                <input type="text" onChange={this.changeHandler} className="form-control" value={this.state.userName} name="userName" required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Email Address</label>
            <div className="col-12 col-sm-8">
                <input type="email" onChange={this.changeHandler} className="form-control" value={this.state.userEmailID} name="userEmailID" required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Password</label>
            <div className="col-12 col-sm-8">
                <input type="text" onChange={this.changeHandler} className="form-control" value={this.state.password} name="password" required="required"/>
            </div>          
        </div>
     
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Mobile Number </label>
            <div className="col-12 col-sm-8">
                <input type="tel" className="form-control" onChange={this.changeHandler}value={this.state.phoneNo} name="phoneNo" required="required" placeholder="12345-12345"  pattern="[0-9]{5}-[0-9]{5}" />
            </div>          
        </div>
  
        <div className="form-group row mt-3">
            <div className="col">
                <p><label className="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="/terms">Terms of Use</a> &amp; <a href="/policy">Privacy Policy</a>.</label></p>
                <button type="submit" onSubmit={this.handleSubmit} className="btn btn-primary btn-lg mt-3">Sign Up</button>
            </div>  
        </div>            
    </form>
    
</div> 
</div>
        );
    }
}

export default Admin;