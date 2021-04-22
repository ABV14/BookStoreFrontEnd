import React, { Component } from "react";
// import ShoppingCart from './Shopping Cart';
import axios from "axios";

class Allproducts extends Component {
    constructor(props) {
        super(props);
        this.state = { response: [], search: "", isloading: true };
        this.toDelete = this.toDelete.bind(this);
        
    }
    async componentDidMount() {
        let res = await axios.get("https://bookstorebackend14.herokuapp.com/api/product");
        this.setState({ response: res.data, isloading: false });
        // 
    }
    
    async toDelete(data1,i){
        const id = data1._id;
        await axios.delete(
          `https://bookstorebackend14.herokuapp.com/api/product/${id}`
        );
        
        const users = [...this.state.response];
        users.splice(i, 1);
        this.setState({ response: users});
          
        
       
      
    }

  //  const filtered= this.state.response.filter(item=> item.productName.toLowerCase().includes(e.target.value))
  //     // this.setState({response:filtered})
  //     

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
    const { isloading, response } = this.state;
    const { search } = this.state;
    const filteredData = this.state.response.filter((data) => {
      return data.bookName.toLowerCase().includes(search.toLowerCase());
    });
    
    if (isloading) {
      return <div className="loading">Loading</div>;
    } else {
      if (filteredData.length > 0) {
        return (
          <div className="container  mt-1 p-auto" style={{margin: "100px"}}>
              {/* <marquee><h1>Products Available are at 50% discount!!! </h1></marquee> */}

              {/* <nav className="navbar navbar-expand-lg navbar-dark  searchNav px-3 py-2 sticky-top">
            <div className="w-75">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.searchItem} />
            
           
            </div>
            
        </nav> */}
        {!search?<div></div>:<h6 className="text-center fw-bold">You Have Searched For "{search}"</h6>}











            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {filteredData.map((item,index) => (
                <div
                  className="col card border-success p-1 mx-3 mt-4 "
                  key={item._id}
                >
                  <div className="card-header bg-light fw-bolder font text-center text-uppercase">
                    
                    <img
                      className="w-100"
                      src={item.bookPoster}
                      alt={item.bookName}
                    ></img>
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Name:{item.bookName}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Price : ₹ {item.bookPrice}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Author:{item.bookAuthor}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Publisher:{item.bookPublisher}
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger float-end"
                      onClick={() => this.toDelete(item,index)}
                    >
                    Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="container-fluid mb-5 p-auto">
            {/* <marquee><h1>Products Available are at 50% discount!!! </h1></marquee> */}
            <div className='container-fluid'>
            {/* <nav className="navbar navbar-expand-lg navbar-dark  searchNav px-3 py-2 sticky-top">
            <div className="w-75 ">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.searchItem} />
            
           
            </div>
            
        </nav> */}
        </div>
          <div className="container p-0">
            





            {filteredData.length === 0 && (
              <p className="text-center fw-bold">No results found for "{this.state.search}" Please Check the below products </p>
            )}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {response.map((item,index) => (
                <div
                  className="col card border-success p-1 mx-3 mt-4 "
                  key={item._id}
                >
                  <div className="card-header bg-light fw-bolder font text-center text-uppercase">
                    
                    <img
                      className="w-100"
                      src={item.bookPoster}
                      alt={item.bookName}
                    ></img>
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Name:{item.bookName}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    Price : ₹ {item.bookPrice}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    bookAuthor:{item.bookAuthor}
                  </div>
                  <div className="card-body font-Helvetica fw-bold fst-italic text-capitalize ">
                    bookPublisher:{item.bookPublisher}
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger float-end"
                      onClick={() => this.toDelete(item,index)}
                    >
                      Remove
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

export default Allproducts;
