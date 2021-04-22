
import React from "react";
// import axios from 'axios'
import "./App.css";


// import Table from './components/Table'
import Navigation from './components/Navigation';
import Routes from './Routes';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
      <Footer/>
    </div>
  );
}

export default App;