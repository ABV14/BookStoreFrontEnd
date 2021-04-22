import React from "react";
import "./Navbar.css";
import { useContext } from "react";
import { store } from "../store.js";
import { withRouter } from "react-router-dom";

const Navigation = (props) => {
  const globalState = useContext(store);

  let y;
  if (globalState.state[0] === "") {
    y = "/Login";
  } else {
    y = `/${globalState.state[0]}`;
  }
  return (
 
    <nav className="navbar navbar-expand-lg display- navbar-light bg-warning">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Book Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link " id="mainNav" href="/home">
                Home
              </a>
            </li>
            {globalState.state[3] === "Cart" &&(
            <li className="nav-item ">
              <a className="nav-link  " id="mainNav" href="/Cart">
                Shopping Cart
              </a>
            </li>)}
            <li className="nav-item ">
            {globalState.state[2] === "Register" &&(
              <a className="nav-link   " id="mainNav" href="/register/Customer">
                {globalState.state[2]}
              </a>)}
            </li>
            {globalState.state[0] === "Admin" && (
              <li className="nav-item ">
                <a
                  className="nav-link  "
                  id="mainNav"
                  href="/AddBook/Allproducts"
                >
                  Add Book
                </a>
              </li>
            )}
          </ul>
        </div>
        <li className="nav-item float-end text-dark">
          <a
            className="nav-link text-dark fw-bold"
            id="mainNav"
            href={y}
          >
            {globalState.state[1]}
          </a>
        </li>
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
