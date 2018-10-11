import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav.js';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div id="page-top">
        <Nav/>
        <div id="wrapper">
        <Sidebar/>
          <div id="content-wrapper">
            <Dashboard/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
