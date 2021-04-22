import React, { Component } from "react";
import axios from "axios";

class Addproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookID: "",
      bookPrice: "",
      bookAuthor: "",
      bookPublisher: "",
      bookPoster: "",
      description:""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler(event) {
    let name = event.target.name;
    let val = event.target.value;
    
    this.setState({ [name]: val });
    
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let data = this.state;
    axios.post("https://bookstorebackend14.herokuapp.com/api/product", data).then((res) => {
      // alert(res.data);
      this.setState({
        bookName: "",
        bookID: "",
        bookPrice: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPoster: "",
        bookType: "",
        description:""
      });
    });
  }

  render() {
    return (
      <div
        className="card border border-3 border-success mt-3  p-3 shadow w-50"
        style={{ width: "500px", margin: "100px auto", padding: "30px 0" }}
      >
        <form className="form-horizontal " onSubmit={this.handleSubmit}>
          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4 ">Book ID </label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookID"
                name="bookID"
                className="form-control"
                value={this.state.bookID}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Book Name</label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookName"
                name="bookName"
                className="form-control"
                value={this.state.bookName}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Book Price</label>
            <div className="col-12 col-sm-8">
              <input
                type="number"
                id="bookPrice"
                name="bookPrice"
                className="form-control"
                value={this.state.bookPrice}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">
              Book Author
            </label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookAuthor"
                name="bookAuthor"
                value={this.state.bookAuthor}
                className="form-control"
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">
              Book Publisher
            </label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookPublisher"
                name="bookPublisher"
                className="form-control"
                value={this.state.bookPublisher}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">
              Book Poster
            </label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookPoster"
                name="bookPoster"
                className="form-control"
                value={this.state.bookPoster}
                onChange={this.changeHandler}
              />
            </div>
          </div>

          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Book Type</label>
            <div className="col-12 col-sm-8">
              <input
                type="text"
                id="bookType"
                name="bookType"
                className="form-control"
                value={this.state.bookType}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className="form-group row mt-3">
            <label className="col-form-label col-12 col-sm-4">Description </label>
            <div className="col-12 col-sm-8">
            <textarea  name="description" rows="4" cols="50" 
              className="form-control"
              value={this.state.description}
              onChange={this.changeHandler}
              ></textarea>
            </div>
          </div>

          <div className="form-group row mt-3">
            <div className="col">
              <button
                type="submit"
                className="btn btn-success btn-lg mt-3 form-control"
              >
                Add Book
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Addproduct;
