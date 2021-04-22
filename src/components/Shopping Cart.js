import React, { Component } from "react";
import axios from "axios";
import Payment from './Payment';
import history from './../history'

import { Link } from "react-router-dom";
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { response: [], total: 0 ,datareceived:false,noOfItems:0};
   
    
  }

  async componentDidMount() {
    let res = await axios.get("https://bookstorebackend14.herokuapp.com/api/selectedProduct");
    
    this.setState({datareceived:true })
    if(localStorage.getItem('userdata')!==null){
    let email=JSON.parse(localStorage.getItem('userdata')).userEmailID
    let userType=JSON.parse(localStorage.getItem('userdata')).userType
    let filter=res.data.filter(item=>{
     return item.emailID===email && item.userType===userType
    }
    )
    localStorage.setItem("cart",JSON.stringify(filter))
    this.setState({ response: filter});
    
    // const arr = [];
    // res.data.map((item) => arr.push(item.productPrice));
    // 
    // const t = arr.reduce((t, n) => t + n);
    // 
    let p=0;
    let count=0
    for(let i=0;i<this.state.response.length;i++)
    {
        p+=filter[i].bookPrice
        count++
        this.setState({noOfItems:count})

      }
    this.setState({ total: p })
    localStorage.setItem("total",p)
   ;
  }
  }
 


 

  async deleteProduct(data1, i) {
    const id = data1._id;
     await axios.delete(
      `https://bookstorebackend14.herokuapp.com/api/selectedProduct/${id}`
    );
    
    const users = [...this.state.response];
    users.splice(i, 1);
    let total = this.state.total;
     total -= data1.bookPrice;
     let count=this.state.noOfItems;
     count=this.state.noOfItems
     count=count-1
    this.setState({ response: users, total: total,noOfItems:count });
    localStorage.setItem("cart",JSON.stringify(users))
    
   
  }

  render() {
    
    const { response, total,noOfItems} = this.state
    // const state=this.state;
    
   
    let x=localStorage.getItem('userdata')
   
   
     if(!this.state.datareceived){
      return <div className="loading">Loading</div>
     }
     if(x!==null){
    return (
      <div className="container mt-1 mx-auto " style={{margin: "100px"}}>
       
        <div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
          { response.map((item, index) => (
            <div className="col card   p-1 mx-3 mt-4 border-info " key={item._id}>
              <div className="card-header fw-bold font bg-light text-center text-uppercase">
                
                <img className="w-100 card-img" src={item.bookPoster} alt={item.bookName}></img>
              </div>
              <div className="card-body font-Helvetica fst-italic text-capitalize ">
                Name:{item.bookName}
              </div>
              <div className="card-body font-Helvetica fst-italic text-capitalize ">
                Price : ₹ {item.bookPrice}
              </div>
              <div className="card-body font-Helvetica fst-italic text-capitalize ">
                Author:{item.bookAuthor}
              </div>
              <div className="card-body font-Helvetica fst-italic text-capitalize ">
                Publisher:{item.bookPublisher}
              </div>

              <div className="card-footer fs-4  fw-bold font text-center text-uppercase">
                <button
                  className="btn btn-danger fs-5 float-end"
                  onClick={this.deleteProduct.bind(this, item, index)}
                  >
                  Remove
                </button>
              </div>
            </div>
          ))}
          </div>
          

        <div className=" card w-50 border border-3   m-auto mt-3  border-info">
          <div className="card-header text-center fw-bold fs-2">My Cart
          <span className="float-end">{noOfItems}</span>
          </div>
          <div className="card-body  p-3 ">
            {(response.length===0)?<div className="display-6 text-center m-3">Cart is empty</div>:
            <div>
              {response.map((item, index) => (
              <div className="row mt-3" key={item._id}>
                <div className="col-12 col-sm-5    text-capitalize">{item.bookName}</div>
                <div className="col-12 col-sm-3 fw-bolder  text-capitalize">price :₹{item.bookPrice}</div>
                <div className="col-12 col-sm-4  text-capitalize">
                <button
                  className="float-end btn btn-danger mb-3 mt-2"
                  onClick={this.deleteProduct.bind(this, item, index)}
                >
                  Remove
                </button>
                </div>
                <hr></hr>
              </div>
              
            ))}
            <div className="row">
              <div className="col-12 col-sm-6">
            <Link
          className="btn btn-primary mt-3"
          to={{
            pathname: "/address",
            
          }}
         onClick={()=>{
           localStorage.setItem("add address",false)
           
         }} >
          Proceed to checkOut
        </Link>
        </div>
        <div className="col-12 col-sm-6 fw-bolder text-center mt-3 text-capitalize"> 
        Total : ₹ {total}</div>
              </div>
            </div>}
        
            {/* <div>Total :  {arr.reduce((t,n)=>t+n)} </div> */}
          </div>
        </div>
              <div className=" mt-5">
             
              </div>
      </div>
     
     <div>

      {this.state.checkOut &&
      ( 
        <div>
      <button className="btn btn-success float-end m-4" onClick={history.push('/home')}>Back to Cart</button>
      <div>
         <Payment className="float-start" paymentTotal={total} />
         </div>
      </div>
      )
    }
    </div>
  
      </div>
    );
  }
  else{
    
    return(
      <div className="container mb-3">
        <div className="card mt-5 w-75 shadow" style={{
            margin: "0 auto",
            padding: ""}}>
          <div className="card-body">
          <h1>Please Login to View the Cart</h1>
          <Link className="m-3 btn btn-success" to='/Login' >Login now</Link>
        <Link className="m-3 btn btn-success" to='/register/Customer' >SignUp </Link>
          </div>

        </div>
       
      </div>
    // <div>

    //   <Redirect to="/Login"></Redirect>
    //   </div>
    )
  }
}
}
  



export default ShoppingCart;
