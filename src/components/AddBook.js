import { React } from "react";
import { NavTab } from "react-router-tabs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Addproduct from "./Addproduct";

import Allproducts from "./Allproducts";

function AddBook(props) {
  return (
    <Router>
      <ul className="mb-3 nav nav-pills nav-justified bg-secondary rounded">
        <li className="nav-item">
          <NavTab
            className="nav-link nvlink text-white "
            to="/AddBook/Addproduct"
          >
            Add New Product
          </NavTab>
        </li>
        <li className="nav-item">
          <NavTab
            className="nav-link nvlink text-white "
            to="/AddBook/Allproducts"
          >
            All products{" "}
          </NavTab>
        </li>
      </ul>

      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/AddBook/Addproduct">
          <Addproduct />
        </Route>

        <Route path="/AddBook/Allproducts">
          <Allproducts />
        </Route>

        <Route exact path="/">
          <Allproducts />
        </Route>
      </Switch>
    </Router>
  );
}

export default AddBook;
