import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Sidebar from './components/Sidebar';
import DieuHuongURL from './components/DieuHuongURL';
import Footer from './components/Footer';
import {
  BrowserRouter as Router
 } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <div id="page-top">
        <Nav/>
        <div id="wrapper">
        <Sidebar/>
          <div id="content-wrapper">
            <DieuHuongURL/>
          </div>
        </div>
        <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
