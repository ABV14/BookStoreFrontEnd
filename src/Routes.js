import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import history from "./history";
import ShoppingCart from "./components/Shopping Cart";
import Payment from "./components/Payment";
import ThankYou from "./components/ThankYou";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Addproduct from "./components/Addproduct";
import AddBook from './components/AddBook';
import Admin from './components/Admin'
import terms from './components/terms';
import policy from './components/policy';
import description from './components/description'
import address from './components/address'
export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/Cart" component={ShoppingCart} />
          <Route path="/thankYou" component={ThankYou} />
          <Route path="/register" component={Registration} />
          <Route path="/Login" component={Login} />
          <Route path="/User" component={Dashboard} />
          <Route path="/Addproduct" component={Addproduct} />
          <Route path="/Admin" component={AdminDashboard} />
          <Route path="/AdminRegistration" component={Admin} />
          <Route path="/address" component={address} />
          <Route path="/AddBook" component={AddBook} />
          <Route path="/terms" component={terms}/>
          <Route path="/policy" component={policy}/>
          <Route path="/description" component={description}/>
          <Route path="/" exact component={Home} />
          <Route path="/Payment" component={Payment}></Route>
        </Switch>
      </Router>
    );
  }
}
