import React,{useState} from "react";
import axios from 'axios'
import { useHistory,Link } from 'react-router-dom'
import  { useContext } from 'react';
import { store } from '../store.js'
function Login () {
    let history=useHistory();
    const globalState = useContext(store);
    const [email,changeEmail]=useState('')
    const [password,changePassword]=useState('')
    const [userType,changeUserType]=useState('')
    // const [dBoard,changeDboard]=useState('')
 
    function handleSubmit(event){
        event.preventDefault();
       
        axios({method:"post",
            url:"https://bookstorebackend14.herokuapp.com/api/verifyuser",
            data:{
                "userEmailID":email,
                "password":password,
                "userType":userType
            }
        })
        .then(function(response){
            alert(response.data.message)
            let msg=response.data.message.trim();
            if(msg==="Login Successful"){
                if(userType==="User"){
                const { dispatch } = globalState;

                dispatch({ type: 'action description',payload:[userType,"Hey, "+response.data.userobj.userName,'','Cart']})
                }
                if(userType==="Admin"){
                    const { dispatch } = globalState;
                    dispatch({ type: 'action description',payload:[userType,"Hey, "+response.data.userobj.userName,'','']})
                }
                
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userdata',JSON.stringify(response.data.userobj))
            if(userType==="User"){
            history.push('/User')
        }
        if(userType==="Admin"){
        history.push('/Admin')
        // let  x=true
    }
        }
        })

    }
    function changeHandler(event){
        let value=event.target.value
        // let value2=event.target.value2
        let name=event.target.name
        
        if(name==="userEmailID"){
            changeEmail(value)
            
        }
        else if(name==="password")
        {
            changePassword(value)
            
           
          
        }
        else if(name==='usertype')
        {
            changeUserType(value)
            
            
            
            
        }
    }

    
    return (
        <div className="card mt-5 p-3 shadow w-50" style={{width: "500px",
            margin: "0 auto",
            padding: "30px 0"}}>
    <form className="form-horizontal " onSubmit={handleSubmit} >
        <div className="row mt-3">
            <div className="col">
                <h2 className="fs-2">Login </h2>
            </div>  
        </div>          
      
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4 ">Email Address</label>
            <div className="col-12 col-sm-8">
                <input type="email" onChange={changeHandler} className="form-control" name="userEmailID" required="required"/>
            </div>          
        </div>
        
        <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Password</label>
            <div className="col-12 col-sm-8">
                <input type="password" onChange={changeHandler} className="form-control" name="password" required="required"/>
            </div>          
        </div>
        <div className="form-group row mt-3">
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            
                        <input type='radio'className='btn-check' name="usertype" value='User' id='User' value2="dashboard" onClick={changeHandler}/>
            <label className="btn btn-outline-primary" htmlFor="User">User</label>
            
        
                        <input type='radio' className='btn-check' name="usertype" value="Admin" id="Admin" value2="AdminDashboard" onClick={changeHandler}/>
            <label className="btn btn-outline-primary" htmlFor="Admin">Admin</label>

                     
            </div>          
        </div>
    
       
        
        
        <div className="form-group row mt-3">
            <div className="col">
                
                <button type="submit" className="btn btn-primary btn-lg mt-3">Login</button>
            </div>  
        </div>            
    </form>
    <div className="text-center mt-5">New User ?<Link className="text-primary" to="/register/Customer">SignUp </Link></div>
</div> 
      
      );
    
    
 
}
    
    
 
export default Login;