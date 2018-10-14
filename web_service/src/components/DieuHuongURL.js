import React, { Component } from 'react';
import {
    Route
  } from 'react-router-dom';

import Dashboard from './Dashboard.js';
import Lichsu from './Lichsu.js';
class DieuHuongURL extends Component {
    render() {
        return (
  
    <div>
     
        <Route exact path="/" component={Dashboard} ></Route>
        <Route path="/history" component={Lichsu} ></Route>

    
    
    </div>
    
    
        );
    }
}

export default DieuHuongURL;