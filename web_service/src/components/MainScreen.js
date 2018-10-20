import React, { Component } from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import DieuHuongURL from './DieuHuongURL';
import Footer from './Footer';
class MainScreen extends Component {
    render() {
        return (
        
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
    

        );
    }
}

export default MainScreen;