import React, { Component } from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import DieuHuongURL from './DieuHuongURL';
import Footer from './Footer';
import {BrowserRouter as Router} from 'react-router-dom';
class MainScreen extends Component {
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

export default MainScreen;