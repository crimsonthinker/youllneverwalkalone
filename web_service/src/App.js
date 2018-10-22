import React, { Component } from 'react';
import './App.css';
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
