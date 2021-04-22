import React, { Component } from "react";
// import ShoppingCart from './Shopping Cart';
import axios from "axios";
import './home.css'
import {Link } from 'react-router-dom'
async function toCart(book) {
  

  let y = localStorage.getItem("token");
  if (y) {
    let emailID = JSON.parse(localStorage.getItem("userdata")).userEmailID;
    let userName = JSON.parse(localStorage.getItem("userdata")).userName;
    let userType = JSON.parse(localStorage.getItem("userdata")).userType;
    const data = {
      emailID: emailID,
      userName: userName,
      bookName: book.bookName,
      bookAuthor: book.bookAuthor,
      bookPrice: book.bookPrice,
      bookPublisher: book.bookPublisher,
      bookPoster: book.bookPoster,
      userType:userType
    };
    
    // const data={...book}
     await axios.post(
      "https://bookstorebackend14.herokuapp.com/api/selectedProduct",
      data
    );
    
    alert("Added to Cart");
  }
    if (!y) {
      alert("Please Login to Add the item to Cart");
    }
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { response: [],selectedData:[], search: "", isloading: true,modal:'' };
  }
  async componentDidMount() {
    let res = await axios.get("https://bookstorebackend14.herokuapp.com/api/product");
    this.setState({ response: res.data, isloading: false,selectedData:res.data });
    // 
  }

  //  const filtered= this.state.response.filter(item=> item.productName.toLowerCase().includes(e.target.value))
  //     // this.setState({response:filtered})
  //     
  selected=(e)=>{
      
      let value=e.target.value
     
    
      if(value){
      let filterdata=this.state.response.filter(ele=>ele.bookType.includes(value))
     this.setState({selectedData:filterdata})
    }
    else{
      this.setState({selectedData:this.state.response})
    }
    
      
  }
  

  searchItem = (e) => {
    
    this.setState({ search: e.target.value });
    
  };
  

  // 
  // const data1 = props.data;
  // 
  // if (props.loading) {
  //   return (
  //     <div>
  //       <h1 className="text-white loading">Loading</h1>
  //     </div>
  //   );
  // } else {

  render() {
    const { isloading,selectedData } = this.state;
    const { search } = this.state;
    const filteredData = this.state.selectedData.filter((data) => {
      return data.bookName.toLowerCase().includes(search.trim().toLowerCase());
    });
    
    
    
    if (isloading) {
      return <div className="loading">Loading</div>;
    } else {
      if (filteredData.length > 0) {
        return (
          <div className="container-fluid mt-0 mx-0 p-auto" style={{margin: "100px"}} >
            {/* <marquee><h1>Products Available are at 50% discount!!! </h1></marquee> */}
            <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark  searchNav px-3 py-2">
                <div className="input-group border-0 px-1 pl-3">  <select className="input-group-text" onChange={this.selected}>
      <option value="" >All Types</option>
        <option value="Humour">Humour</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
              
               
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.searchItem}
                    />
            
                    </div>
            
              </nav>
                    {!search ? (
                      <div></div>
                    ) : (
                      <h6 className="text-center fw-bold">
                        You Have Searched For "{search}"
                      </h6>
                    )}
           
     
            </div>

           <div className="row d-flex justify-content-center row-cols-2 row-cols-md-3 row-cols-lg-6">
          {filteredData.map((item) => (
            <div
              className="col  card border-success p-1 mx-4 mt-4 "
              key={item._id}
              id="cardBody"
            >
              <div className="card-header p-0 bg-light fw-bolder font text-center text-uppercase">
              <Link to="/description"
                onClick={()=>{localStorage.setItem('description',item.description)
                localStorage.setItem('image',item.bookPoster)
                }}>
                    <img
                    className="w-100 card-img-top"
                    src={item.bookPoster}
                    alt={item.bookName}
                  ></img>
                  </Link>
              </div>
              <div className="card-body p-0">
              <p className="m-0"><span className="fw-bold">Name</span>:{item.bookName}</p>
              
              
              <p className="m-0"><span className="fw-bold">Price</span>: ₹ {item.bookPrice}</p>
              
             
                <p className="m-0" ><span className="fw-bold">Author</span>:{item.bookAuthor}</p>
          
         
          <p className="m-0" ><span className="fw-bold">Publisher</span>:{item.bookPublisher}</p>
         </div>
              <div className="card-footer">
                <button
                  className="btn btn-success float-end"
                  onClick={() => toCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      
       </div>
        );
      } else {
        return (
          <div className="container-fluid mt-2 mx-0 p-auto" style={{margin: "100px"}}>
            {/* <marquee><h1>Products Available are at 50% discount!!! </h1></marquee> */}
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark  searchNav px-3 py-2">
                <div className="input-group border-0 px-1 pl-3">  <select className="input-group-text" onChange={this.selected}>
      <option value="" >All Types</option>
        <option value="Humour">Humour</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
              
               
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.searchItem}
                    />
            
                    </div>
            
              </nav>
            </div>
            
            <div className="container-fluid p-0">
              {filteredData.length === 0 && (
                <p className="text-center fw-bold">
                  No results found for "{this.state.search}" Please Check the
                  below products{" "}
                </p>
              )}
      
     
              <div className="row d-flex justify-content-center row-cols-2 row-cols-md-3 row-cols-lg-6">
            {this.state.response.map((item) => (
              <div
                className="col card  border-success p-1 mx-4 mt-4 "
                key={item._id}
                id="cardBody"
              >
                <div className="card-header  p-0 bg-light fw-bolder font text-center text-uppercase">
                <Link to={{
                pathname:"/description",
                data:item.description,
                image:item.bookPoster
              }}>               
                    <img
                    className="w-100 card-img-top"
                    src={item.bookPoster}
                    alt={item.bookName}
                  ></img>
                  </Link>
                </div>
                <div className="card-body p-0">
                
                <p className='m-0'><span className="fw-bold">Name</span>:{item.bookName}</p>
              
              
              <p className='m-0'><span className="fw-bold">Price</span> : ₹ {item.bookPrice}</p>
              
             
                <p className='m-0'><span className="fw-bold">Author</span>:{item.bookAuthor}</p>
          
         
          <p className='m-0'><span className="fw-bold">Publisher</span>:{item.bookPublisher}</p>
           </div>
                <div className="card-footer">
                  <button
                    className="btn btn-success float-end"
                    onClick={() => toCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        
        </div>
          </div>
        );
      }
    }
  }
}

export default Home;
