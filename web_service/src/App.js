import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Sidebar from './components/Sidebar';
import DieuHuongURL from './components/DieuHuongURL';
import Footer from './components/Footer';
import DieuHuongMain from './components/DieuHuongMain';
import {
  BrowserRouter as Router
 } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
      <DieuHuongMain/>
      </Router>
    );
  }
}

export default App;
